// Заявка на первую встречу: что приходит из формы и как это проверяется.
//
// Проверка живёт на сервере - браузер можно обойти и прислать что угодно.
// Поля - решение 2 плана сайта: имя, способ связи, удобное время, откуда
// узнали. Вопроса «с чем вы идёте» нет и не будет: сведения о состоянии - это
// особая категория данных по 152-ФЗ.

export type Zayavka = {
  imya: string;
  svyaz: string;
  vremya: string;
  otkuda: string;
};

export type OshibkaPolya = "imya" | "svyaz" | "soglasie" | "dlina";

// Потолки длины. Форма в браузере режет на 200 знаков, сервер проверяет сам.
const MAKS_DLINA = 200;

// Убирает управляющие символы (переводы строк, табуляцию и прочее) и лишние
// пробелы. Переводы строк в имени - классический способ подсунуть в письмо
// лишние строки, поэтому их нет нигде.
function chistit(znachenie: unknown): string {
  if (typeof znachenie !== "string") return "";
  return znachenie.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

/** Разбирает тело запроса. Возвращает заявку или код ошибки для формы.
 *  `lovushka` - скрытое поле, которое человек не видит и не заполняет;
 *  заполнил - значит робот. Об этом отдельно сообщает `robot`. */
export function razobratZayavku(
  telo: unknown,
): { zayavka: Zayavka } | { oshibka: OshibkaPolya } | { robot: true } {
  const t = (typeof telo === "object" && telo !== null ? telo : {}) as Record<string, unknown>;

  if (chistit(t.lovushka) !== "") return { robot: true };

  const zayavka: Zayavka = {
    imya: chistit(t.imya),
    svyaz: chistit(t.svyaz),
    vremya: chistit(t.vremya),
    otkuda: chistit(t.otkuda),
  };

  if (Object.values(zayavka).some((pole) => pole.length > MAKS_DLINA)) {
    return { oshibka: "dlina" };
  }
  if (zayavka.imya.length < 1) return { oshibka: "imya" };
  if (zayavka.svyaz.length < 3) return { oshibka: "svyaz" };
  if (t.soglasie !== true) return { oshibka: "soglasie" };

  return { zayavka };
}
