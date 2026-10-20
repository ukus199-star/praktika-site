// Блок «Обо мне». Макеты BlokObomne и BlokObomneTel, утверждены 05.10.2026.
// Текст - business/products/site-texts.md, блок «Обо мне». Образование - по
// сканам сертификатов, присланным владелицей 08.10.2026 (лежат в
// public/sertifikaty/). Живое фото - public/foto-obo-mne.jpg.

type Stroka = { gody: string; gde: string; chto: string; skan?: string; skanNadpis?: string };

const OBRAZOVANIE: Stroka[] = [
  // Диплом МГУ прислан 09.10.2026. Подпись «Социальная психология» -
  // решение владелицы (в дипломе: «Психология служебной деятельности»).
  { gody: "2015-2021", gde: "МГУ, факультет психологии", chto: "Социальная психология", skan: "/sertifikaty/mgu-diplom-2021.jpg", skanNadpis: "диплом" },
  {
    gody: "2018-2021",
    gde: "Московский институт гештальт-терапии и консультирования",
    chto: "Теория и практика гештальт-терапии: 546 часов тренинга, 120 часов личной терапии, 123 часа работы под супервидением",
    skan: "/sertifikaty/migtik-gestalt-terapiya-2021.jpg",
  },
  // Сертификат по психосоматике владелица не нашла - часов и ссылки нет.
  { gody: "2022", gde: "Московский институт гештальт-терапии и консультирования", chto: "Психосоматические расстройства" },
];

const KVALIFIKACIYA: Stroka[] = [
  { gody: "2023", gde: "Интенсив по групповой терапии, МИГТиК, Ереван", chto: "76 часов", skan: "/sertifikaty/migtik-gruppovaya-2023.jpg" },
  { gody: "2023", gde: "XXII научно-практическая конференция по гештальт-терапии", chto: "«Человек в меняющемся мире»", skan: "/sertifikaty/migtik-konferenciya-2023.jpg" },
  { gody: "2021-2022", gde: "«Психодемия», повышение квалификации", chto: "«Психологическая работа с группами», 304 часа", skan: "/sertifikaty/psihodemiya-gruppy-2022.jpg" },
  { gody: "2022", gde: "XXI Международная научно-практическая конференция по гештальт-терапии", chto: "«Простые вещи, жизнь и вдохновение»", skan: "/sertifikaty/migtik-konferenciya-2022.jpg" },
  { gody: "2021", gde: "Летний интенсив МИГТиК «Практикум по гештальт-терапии»", chto: "86 часов", skan: "/sertifikaty/migtik-praktikum-2021.jpg" },
  { gody: "2019", gde: "Летний интенсив МИГТиК «Продвижение в гештальт-терапии»", chto: "88 часов", skan: "/sertifikaty/migtik-intensiv-2019.jpg" },
  { gody: "2017", gde: "МГУ, «Аддикции в современном обществе»", chto: "32 часа", skan: "/sertifikaty/mgu-addikcii-2017.jpg" },
];

function Spisok({ zagolovok, stroki }: { zagolovok: string; stroki: Stroka[] }) {
  return (
    <div className="flex flex-col">
      <div className="mb-1.5 text-[13px] text-podpis lg:text-[15px]">{zagolovok}</div>
      {stroki.map((o) => (
        <div key={o.gody + o.gde} className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 border-t border-liniya py-2.5">
          <div className="text-[15px] font-bold lg:text-base">{o.gody}</div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[15px] font-semibold lg:text-base">{o.gde}</div>
            {/* Ссылка на скан - в строке с часами, а не отдельной строкой:
                так список короче на треть (20.10.2026). Высота нажатия
                прежняя, 44 px, за счёт полей ссылки. */}
            <div className="text-sm text-podpis lg:text-[15px]">
              {o.chto}
              {o.skan && (
                <>
                  {" · "}
                  <a
                    href={o.skan}
                    target="_blank"
                    rel="noopener"
                    className="-my-3 inline-block py-3 whitespace-nowrap text-oliva underline underline-offset-4"
                  >
                    {o.skanNadpis ?? "сертификат"}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Foto() {
  // Живое фото - прислала владелица 09.10.2026.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/foto-obo-mne.jpg"
      alt="Ульяна Кустова"
      width={1050}
      height={1400}
      loading="lazy"
      className="h-[420px] w-full rounded-[18px] object-cover object-top lg:h-[480px] lg:rounded-[20px]"
    />
  );
}

// На компьютере стоит под рассказом слева, на телефоне - после списков:
// справа список образования длиннее текста, и под текстом оставалась пустая
// колонка (замечание респондента, 20.10.2026).
function Supervizia({ klass }: { klass: string }) {
  return (
    <div className={`flex-col ${klass}`}>
      <div className="border-t border-liniya pt-3.5 text-[15px] font-semibold lg:text-base">
        Регулярно хожу на супервизию и в личную терапию.
      </div>
      {/* Из Taplink, решение владелицы 08.10.2026. */}
      <p className="m-0 mt-3.5 border-t border-liniya pt-3.5 text-[15px] leading-[1.6] text-abzac lg:text-base">
        Для меня важна связь с профессиональным сообществом: я часто участвую в
        международных научно-практических конференциях и интенсивах по
        гештальт-терапии и другим подходам.
      </p>
    </div>
  );
}

function Obrazovanie() {
  return (
    <div className="flex flex-col gap-7">
      <Spisok zagolovok="Образование" stroki={OBRAZOVANIE} />
      <Spisok zagolovok="Повышение квалификации" stroki={KVALIFIKACIYA} />
      <Supervizia klass="flex lg:hidden" />
    </div>
  );
}

export function OboMne() {
  const abzac = "m-0 text-[15px] leading-[1.6] text-abzac lg:text-[17px]";
  return (
    <section id="obo-mne" className="relative overflow-hidden">
      {/* Солнца в этом блоке нет - решение владелицы 08.10.2026: у фото оно
          заходило на текст, у верхнего угла сталкивалось с солнцем блока
          «Тест», полукругом внизу «мешает». */}
      <div className="mx-auto flex max-w-[1440px] max-lg:max-w-[640px] flex-col gap-[18px] px-4 py-12 lg:flex-row lg:gap-12 xl:gap-24 lg:px-[min(5.56vw,80px)] lg:py-[72px]">
        <div className="contents lg:flex lg:flex-1 lg:flex-col lg:gap-5">
          <h2 className="m-0 text-[28px] leading-[1.15] font-extrabold tracking-[-0.015em] lg:mb-2 lg:text-[46px] lg:leading-[1.1] lg:tracking-[-0.02em]">
            Обо мне
          </h2>
          <div className="mb-5 lg:hidden">
            <Foto />
          </div>
          <p className="m-0 text-lg leading-[1.6] font-bold lg:text-xl">
            Я Ульяна Кустова, гештальт-терапевт. Семь лет работаю с людьми,
            которые привыкли многое тащить на себе и разучились замечать себя.
          </p>
          <p className={abzac}>
            Начинала я с детей: работала психологом в школе, в инклюзивном
            классе, с детьми с расстройствами аутистического спектра. Этот опыт
            дал мне понимание того, как развивается и работает психика. Все мы
            родом из детства, и механизмы, по которым мы взрослеем, у всех
            схожи. Сейчас я работаю со взрослыми - и этот опыт со мной в каждой
            сессии.
          </p>
          <p className={abzac}>
            Мы все хотим получать от жизни удовольствие и при этом заниматься
            любимым делом. Я тоже прошла через выгорание - в профессии, которую
            люблю и считаю нужной. Перестала замечать свою усталость, всё
            сильнее подгоняла себя и подстраивала под чужие нормы и рамки.
          </p>
          <p className={abzac}>
            И поняла: дело было не в том, есть ли смысл в моей работе. Дело было
            в том, как я отношусь к себе и как строю отношения с миром - сколько
            отдаю и сколько позволяю себе брать.
          </p>
          <div>
            <span className="inline-block -rotate-2 rounded-[14px] bg-oliva px-4 pt-0.5 pb-1.5 text-[27px] font-extrabold text-krem lg:text-[29px]">
              и себе тоже
            </span>
          </div>
          <p className={abzac}>
            Поэтому выгорание для меня - не усталость, которую лечит отпуск. Оно
            тесно связано с деньгами, самореализацией, самооценкой, с тем, на
            что вы опираетесь. И через него хорошо видно, как вы строите
            отношения с людьми и с миром вообще.
          </p>
          <p className={abzac}>
            Часто выгорание - это симптом, через который становится видно
            многое. За ним могут стоять очень разные причины: тревога, утрата и
            горе, другие сложные и важные темы. С ними я тоже работаю.
          </p>
          <Supervizia klass="hidden lg:mt-4 lg:flex" />
        </div>
        <div className="mt-2.5 flex flex-col gap-7 lg:mt-0 lg:w-[40%] xl:w-[520px] lg:shrink-0">
          <div className="hidden lg:block">
            <Foto />
          </div>
          <Obrazovanie />
        </div>
      </div>
    </section>
  );
}
