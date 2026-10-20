/* eslint-disable @next/next/no-img-element --
   Портрет - обычный <img>: оптимизатору next/image нужен sharp, а его
   сборка в проекте отключена (pnpm-workspace.yaml, как у теста). Файл уже
   нужного размера, 720×960 (уменьшен 08.10.2026: 1,3 МБ -> 0,67 МБ). */
import { CIFRY, SSYLKA_TEST } from "@/data/sayt";
import { Shapka } from "./Shapka";

// Первый экран. Макеты SolnceA (компьютер, 1440×900) и Telefon2 (телефон,
// 390×1080), утверждены 03.10 и 05.10.2026. Солнце стоит на горизонте,
// лицо на золоте, внизу оливковая полоса - «океан».
//
// Раскладка компьютера - с 1024 px, в долях ширины окна (см. ниже). Ниже
// 1024 - раскладка телефона. До 08.10.2026 компьютер начинался с 1280 px, и
// в обычном окне ноутбука (~1100 px) стояла растянутая телефонная раскладка -
// замечание владелицы.

function Udobnymi() {
  return (
    <span className="mt-1.5 inline-block -rotate-2 rounded-xl bg-oliva px-3 pb-1 text-krem lg:mt-[0.56cqw] lg:rounded-[14px] lg:px-[1.11cqw] lg:pb-[0.42cqw]">
      удобными
    </span>
  );
}

function Knopki() {
  return (
    <div className="flex flex-col gap-2.5 lg:flex-row lg:items-stretch lg:gap-3.5">
      <a
        href="#zapis"
        className="flex min-h-14 items-center justify-center rounded-[14px] bg-oliva px-4 text-base font-extrabold text-krem no-underline lg:min-h-15 lg:px-[clamp(18px,2.08cqw,30px)] lg:text-[15px] lg:whitespace-nowrap xl:text-[17px]"
      >
        Записаться на первую встречу
      </a>
      <a
        href={SSYLKA_TEST}
        className="flex flex-col items-center justify-center gap-0.5 rounded-[14px] border-2 border-oliva px-4 py-2 text-oliva no-underline lg:items-start lg:px-[clamp(14px,1.53cqw,22px)] lg:whitespace-nowrap"
      >
        <span className="text-[15px] font-bold lg:text-base">Пройти тест</span>
        <span className="text-xs text-podpis-oliva lg:text-[13px]">
          12 вопросов · 3 минуты
        </span>
      </a>
    </div>
  );
}

function Polosa() {
  return (
    <div className="flex flex-col gap-3.5 leading-tight text-krem lg:gap-[clamp(6px,0.83cqw,12px)]">
      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-[13px] text-priglush lg:flex lg:gap-[2.2cqw] lg:text-sm">
        {CIFRY.map((c) => (
          <div key={c.chislo}>
            <span className="text-lg font-bold text-krem">{c.chislo}</span>
            {c.podpis && ` ${c.podpis}`}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PervyEkran() {
  return (
    <section className="relative overflow-hidden">
      <Shapka />

      {/* ── Компьютер, от 1024 px ─────────────────────────────────── */}
      {/* Композиция макета 1440 px, пересчитанная в доли ширины (cqw - сотая
          часть ширины контейнера): в окне любой ширины от 1024 до 1440 px
          солнце, горизонт и портрет стоят там же, что в макете, только
          мельче. Шапка 102 px, поэтому всё на 102 px выше макета.
          Деления: 1440 px = 100cqw. */}
      <div className="@container mx-auto hidden max-w-[1440px] lg:block">
        <div className="relative h-[55.42cqw]">
          {/* Солнце 1400 px, центр на горизонте. */}
          <div
            aria-hidden="true"
            className="absolute top-[-0.83cqw] left-[48.61cqw] aspect-square w-[97.22cqw] rounded-full bg-solnce"
          />
          {/* Вода - на всю ширину окна, даже шире 1440 px. */}
          <div
            aria-hidden="true"
            className="absolute top-[47.78cqw] right-[calc(50%-50vw)] bottom-0 left-[calc(50%-50vw)] bg-oliva"
          />
          <img
            src="/portret.png"
            alt="Ульяна Кустова"
            width={720}
            height={960}
            fetchPriority="high"
            className="absolute bottom-0 left-[59.72cqw] h-auto w-[40.28cqw] object-contain object-bottom"
          />
          <div className="absolute top-[0.69cqw] left-[5.56cqw] flex w-[44.44cqw] flex-col gap-[clamp(14px,1.39cqw,20px)]">
            <div className="text-sm text-podpis xl:text-[15px]">
              Онлайн и очно в Москве
            </div>
            <h1 className="m-0 text-[4.58cqw] leading-[1.04] font-extrabold tracking-[-0.025em]">
              Гештальт-терапевт для взрослых, уставших угождать и быть <Udobnymi />
            </h1>
            <p className="m-0 max-w-[540px] text-[clamp(16px,1.25cqw,18px)] leading-[1.55] text-abzac">
              Помогаю увидеть, от чего вы устали, и найти то, что вас наполняет
            </p>
            <Knopki />
          </div>
          <div className="na-olive absolute top-[48.89cqw] left-[5.56cqw] w-[44cqw]">
            <Polosa />
          </div>
        </div>
      </div>

      {/* ── Телефон и планшет ─────────────────────────────────────── */}
      <div className="lg:hidden">
        <div className="mx-auto flex max-w-[640px] flex-col gap-4 px-4 pt-5">
          <div className="text-[13px] text-podpis">
            Онлайн и очно в Москве
          </div>
          <h1 className="m-0 text-[38px] leading-[1.08] font-extrabold tracking-[-0.02em]">
            Гештальт-терапевт для взрослых, уставших угождать и быть <Udobnymi />
          </h1>
          <p className="m-0 text-base leading-normal text-abzac">
            Помогаю увидеть, от чего вы устали, и найти то, что вас наполняет
          </p>
          <Knopki />
        </div>

        {/* Сцена: солнце 800 px, центр на горизонте; портрет низом в воду.
            Отсчёт от центра, чтобы на широком телефоне всё оставалось на
            своих местах относительно друг друга. */}
        <div className="relative mt-5 h-[600px]">
          <div
            aria-hidden="true"
            className="absolute top-0 left-[calc(50%-265px)] h-[800px] w-[800px] rounded-full bg-solnce"
          />
          <div aria-hidden="true" className="absolute inset-x-0 top-[400px] bottom-0 bg-oliva" />
          <img
            src="/portret.png"
            alt="Ульяна Кустова"
            width={720}
            height={960}
            className="absolute top-5 left-[calc(50%-145px)] h-[400px] w-[300px] object-contain object-bottom"
          />
          <div className="na-olive absolute inset-x-0 top-[438px] mx-auto max-w-[640px] px-4">
            <Polosa />
          </div>
        </div>
      </div>
    </section>
  );
}
