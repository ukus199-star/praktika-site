import { SSYLKA_TEST } from "@/data/sayt";

// Блок «Тест». Макеты BlokTest и BlokTestTel, утверждены 05.10.2026:
// оливковая секция, восходящее солнце в правом нижнем углу, четыре типа
// пилюлями, кремовая кнопка.

const TIPY = ["Спасатель", "Отличница", "Миротворец", "Тот, на ком всё держится"];

export function BlokTest() {
  return (
    <section id="test" className="na-olive relative overflow-hidden bg-oliva text-krem">
      <div
        aria-hidden="true"
        className="absolute right-[-90px] bottom-[-180px] h-[360px] w-[360px] rounded-full bg-solnce lg:right-[calc(50%-780px)] lg:bottom-[-320px] lg:h-[640px] lg:w-[640px]"
      />
      <div className="relative mx-auto max-w-[1440px] max-lg:max-w-[640px] px-4 pt-12 pb-[260px] lg:px-[min(5.56vw,80px)] lg:py-24">
        <div className="flex max-w-[640px] flex-col lg:max-w-[min(640px,52vw)] gap-4 lg:gap-[22px]">
          <div className="text-[13px] text-priglush lg:text-[15px]">Тест · бесплатно</div>
          <h2 className="m-0 text-[28px] leading-[1.15] font-extrabold tracking-[-0.015em] lg:text-[46px] lg:leading-[1.1] lg:tracking-[-0.02em]">
            Не уверены, про вас ли это?
          </h2>
          <p className="m-0 text-base leading-[1.55] text-abzac-oliva lg:text-[19px] lg:leading-[1.6]">
            12 вопросов о том, как вы подстраиваетесь под других. В конце - ваш
            способ быть удобным. Подробный разбор придёт письмом.
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0 lg:gap-2.5">
            {TIPY.map((t) => (
              <li
                key={t}
                className="rounded-full border-[1.5px] border-priglush px-3 py-1.5 text-[13px] lg:px-4 lg:py-2 lg:text-[15px]"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-1 flex lg:mt-1.5">
            <a
              href={SSYLKA_TEST}
              className="flex w-full flex-col items-center gap-0.5 rounded-[14px] bg-krem px-4 py-2.5 text-oliva no-underline lg:min-h-16 lg:w-auto lg:items-start lg:justify-center lg:px-8"
            >
              <span className="text-base font-extrabold lg:text-[17px]">Пройти тест</span>
              <span className="text-xs text-podpis-oliva lg:text-[13px]">12 вопросов · 3 минуты</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
