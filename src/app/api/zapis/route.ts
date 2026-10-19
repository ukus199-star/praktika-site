// Адрес формы записи: GET и POST /api/zapis
//
// GET  - включена ли форма. Блок «Запись» спрашивает об этом при показе и не
//        рисует поля, пока ответ «нет».
// POST - заявка. Проверяется и уходит письмом на рабочую почту владелицы.
//
// Заявка здесь только проходит транзитом: её нет ни в базе (базы у сайта
// практики нет), ни в журнале сервера - даже при ошибке в журнал пишется
// только код ошибки. План сайта практики, фаза 4.
//
// Ответы POST:
//   200 { ok: true }                    письмо ушло (или робот - ему тоже «ok»)
//   400 { oshibka: "imya" | ... }       заявка с ошибкой, форма объяснит какой
//   429 { oshibka: "chasto" }           слишком много заявок подряд
//   503 { oshibka: "vyklyucheno" }      форма ещё не включена
//   502 { oshibka: "pochta" }           почтовый сервер не принял письмо

import { razobratZayavku } from "@/lib/zayavka";
import { nastroykiPochty, otpravitZayavkuPismom } from "@/lib/pochta-vk";

// Выключатель. Форма включается только после подачи изменений в уведомление
// Роскомнадзора: новая цель - запись на консультацию. Переменная читается при
// каждом запросе, поэтому включить можно на работающем сайте, без пересборки.
function vklyucheno(): boolean {
  return process.env.FORMA_ZAPISI === "vkl" && nastroykiPochty() !== null;
}

// ─── Ограничение частоты ────────────────────────────────────────────────────
//
// Каждая заявка - настоящее письмо в ящик владелицы. Без потолка ящик можно
// засыпать мусором, а почтовый сервер за массовую отправку заблокирует вход.
//
// Три потолка:
//   - с одного адреса отправителя - 3 заявки за 10 минут. Человеку, который
//     ошибся и переотправил, хватит;
//   - на всех - 10 заявок в минуту;
//   - на всех - 50 заявок в сутки. Больше, чем бывает за неделю.
//
// Урок формы почты (протокол пяти ходов, 22.09.2026): адрес отправителя
// берётся из заголовка, а заголовок подделывается. Поэтому общие потолки от
// заголовка не зависят - даже с выдуманными адресами больше 50 писем в сутки
// не уйдёт.
//
// Адрес отправителя (IP) живёт только в памяти процесса, пока идёт окно в 10
// минут, никуда не записывается и стирается при перезапуске.
const oknoIpMs = 10 * 60_000;
const maksSIp = 3;
const oknoMinutaMs = 60_000;
const maksVMinutu = 10;
const oknoSutkiMs = 24 * 60 * 60_000;
const maksZaSutki = 50;

let nachaloOknaIp = 0;
const poIp = new Map<string, number>();
let nachaloMinuty = 0;
let vMinutu = 0;
let nachaloSutok = 0;
let zaSutki = 0;

function propustit(ip: string, seychas: number): boolean {
  if (seychas - nachaloOknaIp >= oknoIpMs) {
    nachaloOknaIp = seychas;
    poIp.clear();
  }
  if (seychas - nachaloMinuty >= oknoMinutaMs) {
    nachaloMinuty = seychas;
    vMinutu = 0;
  }
  if (seychas - nachaloSutok >= oknoSutkiMs) {
    nachaloSutok = seychas;
    zaSutki = 0;
  }

  const sEtogoIp = poIp.get(ip) ?? 0;
  if (sEtogoIp >= maksSIp || vMinutu >= maksVMinutu || zaSutki >= maksZaSutki) {
    return false;
  }

  poIp.set(ip, sEtogoIp + 1);
  vMinutu += 1;
  zaSutki += 1;
  return true;
}

// Amvera стоит перед сервером посредником и передаёт настоящий адрес в
// заголовке x-forwarded-for - первым в списке. Нет заголовка - все
// неизвестные считаются одним отправителем: строже, но форма не ломается.
function adresOtpravitelya(zapros: Request): string {
  return zapros.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "neizvestno";
}

function otvet(status: number, telo: object): Response {
  return Response.json(telo, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  return otvet(200, { vklyucheno: vklyucheno() });
}

export async function POST(zapros: Request) {
  if (!vklyucheno()) return otvet(503, { oshibka: "vyklyucheno" });

  // Тело больше 4 КБ - не заявка: четыре поля по 200 знаков столько не весят.
  const syroe = await zapros.text();
  if (syroe.length > 4096) return otvet(400, { oshibka: "dlina" });

  let telo: unknown;
  try {
    telo = JSON.parse(syroe);
  } catch {
    return otvet(400, { oshibka: "dlina" });
  }

  const razbor = razobratZayavku(telo);
  // Роботу отвечаем «всё хорошо», чтобы он не учился обходить ловушку.
  if ("robot" in razbor) return otvet(200, { ok: true });
  if ("oshibka" in razbor) return otvet(400, { oshibka: razbor.oshibka });

  if (!propustit(adresOtpravitelya(zapros), Date.now())) {
    return otvet(429, { oshibka: "chasto" });
  }

  const nastroyki = nastroykiPochty();
  if (!nastroyki) return otvet(503, { oshibka: "vyklyucheno" });

  try {
    await otpravitZayavkuPismom(nastroyki, razbor.zayavka);
  } catch (oshibka) {
    // Только код ошибки почтового сервера, без текста письма и адресов.
    const kod = (oshibka as { code?: string; responseCode?: number })?.responseCode
      ?? (oshibka as { code?: string })?.code
      ?? "neizvestno";
    console.error(`[zapis] почтовый сервер не принял письмо: ${kod}`);
    return otvet(502, { oshibka: "pochta" });
  }

  return otvet(200, { ok: true });
}
