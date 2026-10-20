import { CENY, DLITELNOST_VSTRECHI, rubli } from "@/data/sayt";

// Блок «Формат и цены». Макеты BlokCeny и BlokCenyTel, утверждены
// 05.10.2026. Суммы - только из data/sayt.ts (правило репо 1).
//
// Отличие от макета: в нём солнце 520 px заходило под абзац о первой
// встрече. Здесь оно 320 px, а под абзацем 220 px: край солнца в 100 px
// от текста (правило 3 бренд-гайда). Было 400 и 300 - уменьшено 20.10.2026,
// когда сжимали пустоту по замечанию респондента.

const FORMATY = [
  { nazvanie: "Онлайн", gde: "по видеосвязи", ceny: CENY.onlayn },
  { nazvanie: "Очно", gde: "Москва, у метро Смоленская", ceny: CENY.ochno },
];

export function Ceny() {
  return (
    <section id="ceny" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute bottom-[-140px] left-[-120px] h-[240px] w-[240px] rounded-full bg-solnce lg:bottom-[-200px] lg:left-[calc(50%-840px)] lg:h-[320px] lg:w-[320px]"
      />
      <div className="relative mx-auto flex max-w-[1440px] max-lg:max-w-[640px] flex-col gap-6 px-4 pt-12 pb-[200px] lg:gap-8 lg:px-[min(5.56vw,80px)] lg:pt-[72px] lg:pb-[220px]">
        <h2 className="m-0 text-[28px] leading-[1.15] font-extrabold tracking-[-0.015em] lg:text-[46px] lg:leading-[1.1] lg:tracking-[-0.02em]">
          Формат и цены
        </h2>
        <div className="flex flex-col gap-4 md:flex-row lg:gap-6">
          {FORMATY.map((f) => (
            <div key={f.nazvanie} className="na-olive flex flex-1 flex-col gap-1.5 rounded-[22px] bg-oliva px-6 pt-6 pb-2 text-krem lg:px-7 lg:pt-7 lg:pb-3">
              <h3 className="m-0 text-2xl font-extrabold lg:text-[26px]">{f.nazvanie}</h3>
              <div className="mb-2 text-sm text-priglush lg:text-[15px]">{f.gde}</div>
              <dl className="m-0">
                <div className="flex items-baseline justify-between gap-3 border-t border-krem/25 py-4">
                  <dt className="text-[15px] text-priglush lg:text-base">Встреча, {DLITELNOST_VSTRECHI}</dt>
                  <dd className="m-0 text-[22px] font-extrabold whitespace-nowrap lg:text-[26px]">{rubli(f.ceny.vstrecha)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-t border-krem/25 py-4">
                  <dt className="text-[15px] text-priglush lg:text-base">4 встречи</dt>
                  <dd className="m-0 text-[22px] font-extrabold whitespace-nowrap lg:text-[26px]">{rubli(f.ceny.paket)}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        {/* Супервизия - решение владелицы 08.10.2026: в «Формат и цены», а не
            в «Обо мне». Светлая карточка, чтобы клиент не принял её за свой
            формат. Текст - её словами, site-texts.md, блок 7. */}
        <div className="flex flex-col gap-3 rounded-[22px] bg-kartochka px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-7">
          <div className="flex flex-col gap-1">
            <h3 className="m-0 text-lg font-extrabold lg:text-xl">
              Супервизия для начинающих терапевтов
            </h3>
            <p className="m-0 max-w-[640px] text-[15px] leading-normal text-abzac lg:text-base">
              По запросу терапевта. Вместе размышляем над конкретным клиентским
              случаем, который вызывает у вас затруднения. Встреча, {DLITELNOST_VSTRECHI}.
              Записаться - так же, как на обычную встречу.
            </p>
          </div>
          <div className="text-[15px] whitespace-nowrap text-abzac lg:text-base">
            <span className="text-[22px] font-extrabold text-tekst lg:text-[26px]">{rubli(CENY.supervizia)}</span>{" "}
            за встречу
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <p className="m-0 max-w-[640px] text-base leading-normal text-abzac lg:text-[17px]">
            Первая встреча стоит столько же, сколько любая следующая. Точный
            адрес очных встреч - в переписке после записи.
          </p>
          <a
            href="#zapis"
            className="flex min-h-15 items-center justify-center rounded-[14px] bg-oliva px-8 text-base font-extrabold text-krem no-underline lg:text-[17px]"
          >
            Записаться на первую встречу
          </a>
        </div>
      </div>
    </section>
  );
}
