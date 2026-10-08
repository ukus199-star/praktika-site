"use client";

import { useRef, useState } from "react";

// Колесо тем - идея владелицы 03.10.2026, темы утверждены 05.10.2026.
// 08.10.2026 по её Taplink: «Тревожно без причины» стало «Тревога и
// панические атаки», добавлены «Нет сил...», «По-старому...», «Сложно в
// близких отношениях» - 11 тем.
// Макеты Koleso (компьютер: указатель справа, на 3 часа) и KolesoTel2
// (телефон: колесо висит сверху, указатель снизу, подписи по дуге).

const TEMY = [
  { korotko: "Работа не кончается вечером", zagolovok: "Работа давно не заканчивается вечером", tekst: "Она едет с вами домой, в выходные и в отпуск, а усталость не проходит после отдыха. Разбираемся, где вы отдаёте больше, чем позволяете себе брать." },
  { korotko: "Всё держится на мне", zagolovok: "Всё держится на мне", tekst: "Вы опора для всех - на работе и дома, и кажется: стоит отпустить, и всё рухнет. Смотрим, откуда эта ноша и на что можно опереться вам самим." },
  { korotko: "Срываюсь на близких", zagolovok: "Срываюсь на близких - и пугаюсь себя", tekst: "Весь день держитесь, а дома прорывает. Смотрим, что копится за день и как замечать это раньше, чем случится срыв." },
  { korotko: "Не могу отказать", zagolovok: "Не могу отказать, а потом злюсь", tekst: "Соглашаетесь, потому что неловко, - и злитесь на других и на себя. Ищем, где ваше «нет» и почему его так трудно сказать." },
  { korotko: "Не понимаю, чего хочу", zagolovok: "Не понимаю, чего хочу", tekst: "«Надо» давно звучит громче, чем «хочу». Вместе ищем, чего хочется вам, а не чего от вас ждут." },
  { korotko: "Тревога, панические атаки", zagolovok: "Тревога и панические атаки", tekst: "Тревога часто стоит за выгоранием, а иногда накрывает волной. Вместе замечаем, когда она приходит и что за ней стоит." },
  { korotko: "Нет сил, ничего не радует", zagolovok: "Нет сил, и ничего не радует", tekst: "Бывает, энергия уходит, и жизнь будто теряет цвет. Ищем, куда ушли силы и как снова почувствовать контакт с собой и с миром." },
  { korotko: "После потери - только работа", zagolovok: "После потери ушли в работу", tekst: "Иногда после утраты мы загружаем себя делами, чтобы не чувствовать. Горю нужно место и время - здесь его можно прожить, а не заглушать работой." },
  { korotko: "По-старому не работает", zagolovok: "По-старому уже не работает", tekst: "А как по-новому, пока непонятно. Выгорание бывает входом в такой кризис. Вместе ищем, что для вас важно теперь." },
  { korotko: "Сложно в близких отношениях", zagolovok: "Сложно строить близкие отношения", tekst: "Сближаться страшно, или близость не удаётся удержать. Смотрим, что происходит с вами в контакте с другими." },
  { korotko: "Отдаю больше, чем беру", zagolovok: "Отдаю больше, чем беру", tekst: "Деньги, признание, самооценка, опора на себя. Смотрим, как устроен ваш обмен с миром и где в нём место для вас." },
];

const N = TEMY.length;
const SHAG = 360 / N;
// Сектор k смотрит на угол k*SHAG + SHAG/2 - 90, отсчёт от 3 часов.
const UGOL = TEMY.map((_, k) => k * SHAG + SHAG / 2 - 90);
// На телефоне темы стоят по колесу в обратную сторону. Указатель там внизу,
// и при прямом порядке следующая тема подъезжала против пальца: свайп
// влево - а низ колеса уходит вправо (замечание владелицы 08.10.2026).
// Зеркальный порядок: колесо едет вслед за пальцем.
const UGOL_TEL = UGOL.map((u) => -u);
// Цвета секторов - прямо значениями, а не переменными темы: Tailwind
// выводит в CSS только те переменные, что встречаются в классах, и второй
// тон солнца без этого пропадал - вместе с ним пропадала вся заливка.
// Значения - бренд-гайд: солнце и второй тон солнца.
// Тем нечётное число - последний сектор встал бы рядом с первым того же
// цвета, и они слились бы. Ему - промежуточный тон (бренд-гайд, 08.10.2026).
const ZALIVKA = `conic-gradient(${TEMY.map(
  (_, k) =>
    `${N % 2 && k === N - 1 ? "#eea838" : k % 2 ? "#e9a233" : "#f2ae3d"} ${k * SHAG}deg ${(k + 1) * SHAG}deg`,
).join(", ")})`;

/** «С чем я не работаю» - из Taplink владелицы, раскрывается по нажатию
 *  (её просьба 08.10.2026: «интерактивно»). Штатный <details>: работает
 *  без JavaScript и с клавиатуры. */
function NeRabotayu() {
  return (
    <details className="group rounded-2xl border border-liniya px-4 lg:px-5">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-bold lg:text-base [&::-webkit-details-marker]:hidden">
        <span>А с чем я не работаю</span>
        <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-oliva text-base text-oliva">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      <p className="m-0 pb-4 text-[15px] leading-[1.55] text-abzac lg:text-base">
        С химическими зависимостями и с клиническими психиатрическими
        диагнозами: биполярным расстройством, клинической депрессией, ПРЛ,
        шизофреническими расстройствами. Если ваш запрос из этой области,
        скажу прямо и подскажу, к кому обратиться.
      </p>
    </details>
  );
}

export function Koleso() {
  const [i, setI] = useState(0);
  // Полные обороты: с последней темы на первую колесо идёт дальше, а не назад.
  const [oboroty, setOboroty] = useState(0);
  const kasanie = useRef<{ x: number; y: number } | null>(null);

  const dalshe = () => {
    setI((i + 1) % N);
    if (i + 1 === N) setOboroty(oboroty + 1);
  };
  const nazad = () => {
    setI((i - 1 + N) % N);
    if (i === 0) setOboroty(oboroty - 1);
  };

  // Колесо поворачиваем на минус угол текущего сектора - он встаёт под
  // указатель. На телефоне указатель внизу, это ещё +90°.
  const povorot = -UGOL[i] - oboroty * 360;
  // Телефон: тему k под указатель внизу (90°) ставит поворот 90 - UGOL_TEL[k].
  const povorotTel = 90 - UGOL_TEL[i] + oboroty * 360;
  const tema = TEMY[i];

  const nomer = (
    <div className="text-[13px] text-podpis lg:text-[15px]">
      С чем приходят · {i + 1} из {N}
    </div>
  );
  const opisanie = (
    <div aria-live="polite" className="flex flex-col gap-4 lg:gap-[clamp(14px,1.53cqw,22px)]">
      <h2 className="m-0 text-[28px] leading-[1.15] font-extrabold tracking-[-0.015em] lg:text-[clamp(32px,3.19cqw,46px)] lg:leading-[1.1] lg:tracking-[-0.02em]">
        {tema.zagolovok}
      </h2>
      <p className="m-0 text-base leading-[1.55] text-abzac lg:max-w-[560px] lg:text-[clamp(16px,1.32cqw,19px)] lg:leading-[1.6]">
        {tema.tekst}
      </p>
    </div>
  );
  const strelki = (razmer: string) => (
    <>
      <button
        type="button"
        onClick={nazad}
        aria-label="Предыдущая тема"
        className={`${razmer} flex shrink-0 items-center justify-center rounded-full border-2 border-oliva text-xl text-oliva`}
      >
        ←
      </button>
      <button
        type="button"
        onClick={dalshe}
        aria-label="Следующая тема"
        className={`${razmer} flex shrink-0 items-center justify-center rounded-full bg-oliva text-xl text-krem`}
      >
        →
      </button>
    </>
  );

  return (
    <section
      aria-label="С чем приходят"
      className="relative overflow-hidden"
      onTouchStart={(e) =>
        (kasanie.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })
      }
      onTouchEnd={(e) => {
        if (kasanie.current === null) return;
        const vbok = e.changedTouches[0].clientX - kasanie.current.x;
        const vniz = e.changedTouches[0].clientY - kasanie.current.y;
        kasanie.current = null;
        // Тему меняет только явное движение вбок: сдвиг в сторону больше
        // 40 px и в полтора раза больше вертикального. Иначе колесо
        // крутилось, когда страницу листали вниз чуть наискосок
        // (замечание владелицы 08.10.2026).
        if (Math.abs(vbok) < 40 || Math.abs(vbok) < Math.abs(vniz) * 1.5) return;
        if (vbok < 0) dalshe();
        else nazad();
      }}
    >
      {/* Весь список для экранного диктора: колесо - картинка. */}
      <ul className="sr-only">
        {TEMY.map((t) => (
          <li key={t.korotko}>
            {t.zagolovok}. {t.tekst}
          </li>
        ))}
      </ul>

      {/* ── Компьютер, от 1024 px ─────────────────────────────────── */}
      {/* Как первый экран: композиция макета 1440×900 в долях ширины
          (100cqw = 1440 px), чтобы колесо и подписи на нём уменьшались
          вместе с окном, а не обрезались. */}
      <div className="@container mx-auto hidden max-w-[1440px] lg:block">
        <div className="relative min-h-[62.5cqw] pb-12">
          <div
            aria-hidden="true"
            className="absolute top-[8.89cqw] left-[-10.83cqw] aspect-square w-[52.78cqw] overflow-hidden rounded-full"
          >
            <div
              className="absolute inset-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
              style={{ background: ZALIVKA, transform: `rotate(${povorot}deg)` }}
            >
              {TEMY.map((t, k) => (
                <div
                  key={t.korotko}
                  className="absolute top-1/2 left-1/2 h-0 w-0"
                  style={{ transform: `rotate(${UGOL[k]}deg)` }}
                >
                  <div className="absolute top-[-1.67cqw] left-[7.64cqw] w-[17.36cqw] text-[clamp(12px,1.11cqw,16px)] leading-tight font-bold text-solnce-tekst">
                    {t.korotko}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute top-[calc(35.28cqw-16px)] left-[41.25cqw] h-0 w-0 border-y-[16px] border-r-[26px] border-y-transparent border-r-oliva"
          />
          <div className="relative ml-[50cqw] flex w-[43.06cqw] flex-col pt-[11.81cqw] gap-[clamp(14px,1.53cqw,22px)]">
            {nomer}
            {opisanie}
            <div className="mt-2 flex items-center gap-3">
              {strelki("h-14 w-14")}
              <a href="#zapis" className="ml-5 text-base font-bold underline-offset-[5px]">
                Записаться на первую встречу
              </a>
            </div>
            <div className="max-w-[560px]">
              <NeRabotayu />
            </div>
          </div>
        </div>
      </div>

      {/* ── Телефон и планшет ─────────────────────────────────────── */}
      <div className="relative pt-[360px] pb-12 lg:hidden">
        <div
          aria-hidden="true"
          className="absolute top-[-300px] left-[calc(50%-300px)] h-[600px] w-[600px] overflow-hidden rounded-full"
        >
          <div
            className="absolute inset-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
            style={{ background: ZALIVKA, transform: `rotate(${povorotTel}deg)` }}
          >
            {TEMY.map((t, k) => (
              <div
                key={t.korotko}
                className="absolute top-[300px] left-[300px] h-0 w-0"
                style={{ transform: `rotate(${UGOL_TEL[k]}deg)` }}
              >
                <div className="absolute top-0 left-[228px] w-[132px] -translate-x-1/2 -translate-y-1/2 -rotate-90 text-center text-[13px] leading-[1.2] font-bold text-solnce-tekst">
                  {t.korotko}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute top-[308px] left-[calc(50%-14px)] h-0 w-0 border-x-[14px] border-b-[22px] border-x-transparent border-b-oliva"
        />
        <div className="mx-auto flex max-w-[640px] flex-col gap-4 px-4">
          {nomer}
          {opisanie}
          <div className="mt-1 flex items-center gap-3">
            {strelki("h-[52px] w-[52px]")}
            <div className="text-[13px] text-podpis">или листайте пальцем</div>
          </div>
          <NeRabotayu />
          <a href="#zapis" className="mt-2 flex min-h-11 items-center text-base font-bold underline-offset-[5px]">
            Записаться на первую встречу
          </a>
        </div>
      </div>
    </section>
  );
}
