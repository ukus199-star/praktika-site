// Старые адреса на корне kustova-psy.ru, которые жили у теста.
//
// До фазы 5 на kustova-psy.ru стоял тест. Его адреса уже разошлись: /test - в
// постах и шапке Instagram, /tg и /zapis - в письмах с разбором (письма живут
// в ящиках годами), /politika и /soglasie* - в согласиях и в подвале. Когда
// корень занял сайт практики, тест переехал на test.kustova-psy.ru, и каждый
// из этих адресов обязан продолжать работать (план сайта практики, «Что
// держит адрес kustova-psy.ru»).
//
// Почему здесь, а не в redirects из next.config: там правила сопоставляются
// без учёта регистра, и у теста правило для /TG ловило сам /tg - адрес
// перенаправлял на себя по кругу (udobnost/src/proxy.ts). Здесь путь
// сравнивается явно, после перевода в нижний регистр: телефонная клавиатура
// сама ставит первую букву заглавной.
//
// Код 307, а не постоянный 308: цели могут поменяться (документы, например,
// однажды переедут на сайт практики), а постоянный браузеры запоминают надолго.
// Метки после «?» (utm из Instagram) переносятся как есть.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADRES_TESTA, TELEGRAM } from "@/data/sayt";

/** Пути теста, которые уходят на test.kustova-psy.ru под тем же именем. */
const PUTI_TESTA = ["/zapis", "/politika", "/soglasie", "/soglasie-rassylka"];

export function proxy(request: NextRequest) {
  const put = request.nextUrl.pathname.toLowerCase().replace(/\/+$/, "");

  if (put === "/tg") {
    return NextResponse.redirect(TELEGRAM.ssylka, 307);
  }

  let cel: URL | null = null;
  if (put === "/test") {
    cel = new URL("/", ADRES_TESTA);
  } else if (PUTI_TESTA.includes(put)) {
    cel = new URL(put, ADRES_TESTA);
  }
  if (!cel) return NextResponse.next();

  cel.search = request.nextUrl.search;
  return NextResponse.redirect(cel, 307);
}

// Прослойка включается только на этих путях, чтобы не стоять на дороге у
// главной. Сопоставление чувствительно к регистру, поэтому каждая буква - в
// двух вариантах. Значения обязаны быть буквальными: константы сюда не
// подставятся.
export const config = {
  matcher: [
    "/([tT][gG])",
    "/([tT][eE][sS][tT])",
    "/([zZ][aA][pP][iI][sS])",
    "/([pP][oO][lL][iI][tT][iI][kK][aA])",
    "/([sS][oO][gG][lL][aA][sS][iI][eE])",
    "/([sS][oO][gG][lL][aA][sS][iI][eE]-[rR][aA][sS][sS][yY][lL][kK][aA])",
  ],
};
