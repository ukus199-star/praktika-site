// Всё, что на сайте меняется: цены, ссылки, адреса. Одно место на значение -
// правило репо номер 1. Тексты блоков живут в самих блоках: они меняются
// вместе с вёрсткой и утверждаются по business/products/site-texts.md.

/** Цены. Источник - business/life-metrics.md, метрики «Цена первой встречи»,
 *  «Цена очной встречи», «Цена пакета из 4 сессий», «Цена супервизии». Меняются там - меняются
 *  здесь, и только здесь. */
export const CENY = {
  onlayn: { vstrecha: 5000, paket: 19000 },
  ochno: { vstrecha: 6000, paket: 22000 },
  /** Супервизия для начинающих терапевтов - метрика «Цена супервизии». */
  supervizia: 3000,
} as const;

export const DLITELNOST_VSTRECHI = "50-60 минут";

/** 5000 -> «5 000 ₽». Пробел - неразрывный, чтобы сумма не рвалась. */
export function rubli(summa: number): string {
  return `${summa.toLocaleString("ru-RU").replace(/\s/g, " ")} ₽`;
}

/** Сайт практики - корень домена с фазы 5. */
export const ADRES_SAYTA = "https://kustova-psy.ru";

/** Где живёт тест «Насколько вы удобны» с фазы 5. В постах по-прежнему
 *  публикуется kustova-psy.ru/test - его перенаправляет сюда src/proxy.ts.
 *  Ссылки самого сайта ведут сюда напрямую, без лишнего перехода. */
export const ADRES_TESTA = "https://test.kustova-psy.ru";

export const SSYLKA_TEST = ADRES_TESTA;

export const TELEGRAM = {
  imya: "@ukusto",
  ssylka: "https://t.me/ukusto",
};

/** Почта в подвале. Какой ей быть - решается в фазе 4 вместе с тем, куда
 *  приходят заявки (в макете личная). */
export const POCHTA = "ukus199@gmail.com";

/** Документы живут на сайте теста: их согласия дают в форме почты там. */
export const DOKUMENTY = {
  politika: ADRES_TESTA + "/politika",
  soglasie: ADRES_TESTA + "/soglasie",
};

export const INN = "772825329072";

/** Цифры доверия на первом экране. */
export const CIFRY = [
  { chislo: "7 лет", podpis: "практики" },
  { chislo: "300+", podpis: "клиентов" },
  { chislo: "МГУ · МИГТиК", podpis: "" },
] as const;
