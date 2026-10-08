"use client";

import { useRef, useState, type ReactNode } from "react";

// Блок «Отзывы и видео». Макеты BlokOtzyvy и BlokOtzyvyTel, 07.10.2026.
// Отзывов и видео пока нет - стоят заглушки. Отзывы не придумываются:
// тексты пришлёт владелица.

const OTZYVY = [1, 2, 3, 4, 5, 6];
const VIDEO = [1, 2, 3];

function Karusel({
  zagolovok,
  id,
  children,
}: {
  zagolovok: string;
  id: string;
  children: ReactNode;
}) {
  const lenta = useRef<HTMLDivElement>(null);
  const listat = (napravlenie: 1 | -1) => {
    const el = lenta.current;
    if (!el) return;
    const kartochka = el.firstElementChild as HTMLElement | null;
    const shag = kartochka ? kartochka.offsetWidth + 20 : el.clientWidth;
    el.scrollBy({ left: napravlenie * shag, behavior: "smooth" });
  };
  const strelka =
    "flex h-[52px] w-[52px] items-center justify-center rounded-full text-xl lg:h-14 lg:w-14";

  return (
    <div className="flex flex-col gap-5 lg:gap-9">
      <div className="flex items-center justify-between gap-4">
        <h2 id={id} className="m-0 text-[28px] font-extrabold tracking-[-0.015em] lg:text-[46px] lg:tracking-[-0.02em]">
          {zagolovok}
        </h2>
        <div className="flex gap-2.5">
          <button type="button" aria-label="Назад" onClick={() => listat(-1)} className={`${strelka} border-2 border-oliva text-oliva`}>
            ←
          </button>
          <button type="button" aria-label="Вперёд" onClick={() => listat(1)} className={`${strelka} bg-oliva text-krem`}>
            →
          </button>
        </div>
      </div>
      <div
        ref={lenta}
        role="region"
        aria-labelledby={id}
        tabIndex={0}
        className="bez-polosy -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 lg:-mx-[min(5.56vw,80px)] lg:scroll-px-[min(5.56vw,80px)] lg:px-[min(5.56vw,80px)]"
      >
        {children}
      </div>
    </div>
  );
}

function Otzyv() {
  const [celikom, setCelikom] = useState(false);
  return (
    <article className="flex w-[300px] shrink-0 snap-start flex-col gap-3.5 rounded-[20px] bg-kartochka p-6 lg:min-h-[280px] lg:w-[410px] lg:p-7">
      <div aria-hidden="true" className="h-9 w-9 rounded-full bg-solnce" />
      <div className={`text-base leading-normal text-abzac lg:text-lg ${celikom ? "" : "line-clamp-6"}`}>
        [ Текст отзыва - пришлёте вы. ]{" "}
        <span className="font-extrabold text-oliva">[ Одна-две главные фразы выделены оливковым ]</span>,
        остальное обычным текстом.
      </div>
      <button
        type="button"
        aria-expanded={celikom}
        onClick={() => setCelikom(!celikom)}
        className="mt-auto flex min-h-11 items-center self-start text-[15px] font-bold underline underline-offset-4 lg:text-base"
      >
        {celikom ? "Свернуть" : "Читать дальше"}
      </button>
    </article>
  );
}

function Video() {
  return (
    <div className="flex w-[300px] shrink-0 snap-start flex-col gap-3 lg:w-[410px]">
      {/* Видео ещё нет. Когда появится - кнопка откроет его; пока она
          выключена, чтобы не обещать то, чего нет. */}
      <button
        type="button"
        disabled
        aria-label="Видео появится позже"
        className="flex h-[170px] items-center justify-center rounded-[18px] bg-zaglushka lg:h-[230px]"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-oliva">
          <span className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-krem" />
        </span>
      </button>
      <div className="text-[15px] font-bold lg:text-[17px]">[ О чём это видео ]</div>
    </div>
  );
}

export function Otzyvy() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto flex max-w-[1440px] max-lg:max-w-[640px] flex-col gap-12 px-4 py-12 lg:gap-[76px] lg:px-[min(5.56vw,80px)] lg:py-[100px]">
        <Karusel zagolovok="Что говорят клиенты" id="otzyvy">
          {OTZYVY.map((n) => (
            <Otzyv key={n} />
          ))}
        </Karusel>
        <Karusel zagolovok="Видео" id="video">
          {VIDEO.map((n) => (
            <Video key={n} />
          ))}
        </Karusel>
      </div>
    </section>
  );
}
