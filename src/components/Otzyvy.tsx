"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Блок «Отзывы и видео». Макеты BlokOtzyvy и BlokOtzyvyTel, 07.10.2026.
// Отзывы - из business/assets/otzyvy.md, обезличены и утверждены
// владелицей 10.10.2026. Не придумываются и не правятся здесь мимо файла.
// Фраза в **звёздочках** выделяется оливковым, пустая строка - абзац.
// Видео - подкаст «Твоя опора», лежат в VK Видео с доступом по ссылке
// (plans/2026-10-10-video-podkasta.md). До нажатия на странице только наша
// обложка: плеер VK грузится по клику, и до этого VK ничего не получает о
// посетителе. Обложки - public/video/, собраны из кадров выпусков.

const OTZYVY = [
  `**Можно быть всей собой.** А ведь сначала было непонятно. Было страшно. Но очень хотелось жить и творить. И не хотелось верить, что as is - это единственная опция.

И ощущение не обмануло. По-другому можно.

Можно чувствовать и можно просто, черт возьми, быть! И любить себя! И любить другого человека! И посылать в жопу тех, кто нарушает границы! Можно злиться! И можно радоваться до визга! И при этом собирать волшебных людей рядом.`,
  `**Теперь я четко ощущаю свое и не беру не свое.** А начинали мы со стадий «кто я» и «почему так неприятно». Из этого почти года терапии я выйду той, «которая может, знает и делает», «которая слышит себя», «которая не боится быть заметной», «которой хорошо и спокойно за себя, что бы ни было вокруг», «которая чувствует источники опоры и поддержки и умеет их себе просить».`,
  `**Я ухожу продолжать учиться, быть новой собой.** Ощущать новые грани. Я могла позволить себе ту свободу на встречах в контактах с собой же, которую никогда раньше моя увлекательная, но внутренне не безопасная среда взросления не давала мне ощутить.`,
  `**Для меня это очень большой прогресс:** недавно я смог поболтать с другом о том, как мне плохо, и хорошенько проплакаться. На время плача я, правда, замьютил микрофон.

Я в целом признателен за то, что со мной происходит. Наши встречи очень важны для меня - для контакта с самим собой, понимания себя и решения многих моих проблем. Большое спасибо за такую возможность. Очень рад, что у меня сейчас есть эта поддержка.`,
  `**Раньше я даже на сессиях была достаточно хорошей**, мол, вся такая учусь осознанности, я молодец. Но я не могла вытащить из себя свою неидеальность.

А сейчас замечаю, что со временем учусь говорить все честнее и честнее. Уже могу вслух говорить, а затем и признавать свои «теневые» стороны. Мне это все ещё тяжело даётся, но это офигеть как круто.`,
  `**Панические атаки в итоге ушли, и качество жизни наладилось.** А ведь раньше я постоянно боялся, что умру, и будто ждал, что на сеансах меня от этой смерти спасут, хахах. Ну, фактически, сеансы и правда повлияли на мое будущее. Спасибо 🤍`,
];
const PLEER = "https://vkvideo.ru/video_ext.php?oid=-242169176";

const VIDEO = [
  { id: 456239018, hash: "cf2a02b2cb505425", nazvanie: "Мне не нужен совет", podpis: "Чем поддержка отличается от помощи и почему она нужна не только детям" },
  { id: 456239019, hash: "7f3f843b230d8030", nazvanie: "Выговориться и успокоиться", podpis: "Группы поддержки: зачем рассказывать о себе незнакомым людям" },
  { id: 456239020, hash: "fa3f73539d7bd63b", nazvanie: "Слишком многого хочу", podpis: "Как тревога связана со способностью жить в полную силу" },
  { id: 456239021, hash: "260cefc9686d8b1f", nazvanie: "А что самое страшное?", podpis: "Что делать с тревогой: замедлиться, вернуться в тело и спросить себя, чего вы на самом деле хотите" },
  { id: 456239022, hash: "a735e7ba2fbd75a4", nazvanie: "Агрессия не враг", podpis: "Агрессия не враг: почему без неё невозможно жить" },
  { id: 456239023, hash: "92879673769fd3f4", nazvanie: "Злость, которая разрушает", podpis: "Здоровая злость и разрушительная: как заметить свою и прожить её бережно" },
  { id: 456239024, hash: "3d50eeb9a141ea94", nazvanie: "Голос мамы в голове", podpis: "Откуда берётся отношение к себе и как оно меняется во взрослом возрасте" },
];

type Vypusk = (typeof VIDEO)[number];
const pleer = (v: Vypusk) => `${PLEER}&id=${v.id}&hash=${v.hash}&hd=3`;

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

function Otzyv({ tekst }: { tekst: string }) {
  const [celikom, setCelikom] = useState(false);
  // Кнопка нужна, только если текст правда обрезан: короткий отзыв
  // помещается целиком, и «Читать дальше» раскрывало бы пустоту.
  const [obrezan, setObrezan] = useState(false);
  const blok = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = blok.current;
    if (!el) return;
    const proverit = () => {
      if (!el.classList.contains("line-clamp-6")) return;
      setObrezan(el.scrollHeight > el.clientHeight + 1);
    };
    proverit();
    const nablyudatel = new ResizeObserver(proverit);
    nablyudatel.observe(el);
    return () => nablyudatel.disconnect();
  }, []);
  // В свёрнутой карточке абзацы идут подряд: иначе обрезка на пустой
  // строке между ними оставляет одинокое многоточие.
  const kuski = (celikom ? tekst : tekst.replace(/\n\n/g, " ")).split("**");
  return (
    <article className="flex w-[300px] shrink-0 snap-start flex-col gap-3.5 rounded-[20px] bg-kartochka p-6 lg:min-h-[280px] lg:w-[410px] lg:p-7">
      <div aria-hidden="true" className="h-9 w-9 rounded-full bg-solnce" />
      <div
        ref={blok}
        className={`whitespace-pre-line text-base leading-normal text-abzac lg:text-lg ${celikom ? "" : "line-clamp-6"}`}
      >
        {kuski.map((kusok, i) =>
          i % 2 === 1 ? (
            <span key={i} className="font-extrabold text-oliva">
              {kusok}
            </span>
          ) : (
            kusok
          ),
        )}
      </div>
      {obrezan && (
        <button
          type="button"
          aria-expanded={celikom}
          onClick={() => setCelikom(!celikom)}
          className="mt-auto flex min-h-11 items-center self-start text-[15px] font-bold underline underline-offset-4 lg:text-base"
        >
          {celikom ? "Свернуть" : "Читать дальше"}
        </button>
      )}
    </article>
  );
}

// Играет одно видео за раз: запуск другого возвращает прежнее к обложке,
// иначе два выпуска говорили бы одновременно.
function Video({ v, nomer, igraet, zapustit }: { v: Vypusk; nomer: number; igraet: boolean; zapustit: () => void }) {
  const ramka = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (igraet) ramka.current?.focus();
  }, [igraet]);
  return (
    <div className="flex w-[300px] shrink-0 snap-start flex-col gap-3 lg:w-[410px]">
      <div className="relative aspect-video overflow-hidden rounded-[18px] bg-zaglushka">
        {igraet ? (
          <iframe
            ref={ramka}
            src={`${pleer(v)}&autoplay=1`}
            title={`Подкаст «Твоя опора»: ${v.nazvanie}`}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={zapustit}
            aria-label={`Смотреть выпуск «${v.nazvanie}»`}
            className="group absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/video/oblozhka-${nomer}.jpg`}
              alt=""
              width={1280}
              height={720}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            {/* Кнопка в правом верхнем углу, на солнце: в центре обложки
                заголовок и портреты. */}
            <span className="absolute top-2.5 right-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-oliva shadow-[0_6px_16px_-6px_rgba(30,27,22,.5)] transition-transform group-hover:scale-110 lg:top-3.5 lg:right-3.5 lg:h-[52px] lg:w-[52px]">
              <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-krem lg:ml-1 lg:border-y-[9px] lg:border-l-[15px]" />
            </span>
          </button>
        )}
      </div>
      <p className="m-0 text-[15px] font-bold leading-snug lg:text-[17px]">{v.podpis}</p>
      <a
        href={pleer(v)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center self-start text-[15px] text-podpis underline underline-offset-4 lg:text-base"
      >
        Смотреть во VK
      </a>
    </div>
  );
}

export function Otzyvy() {
  const [igraet, setIgraet] = useState<number | null>(null);
  return (
    <section className="overflow-hidden">
      <div className="mx-auto flex max-w-[1440px] max-lg:max-w-[640px] flex-col gap-12 px-4 py-12 lg:gap-[76px] lg:px-[min(5.56vw,80px)] lg:py-[100px]">
        <Karusel zagolovok="Что говорят клиенты" id="otzyvy">
          {OTZYVY.map((tekst, n) => (
            <Otzyv key={n} tekst={tekst} />
          ))}
        </Karusel>
        <Karusel zagolovok={"Подкаст «Твоя\u00a0опора»"} id="video">
          {VIDEO.map((v, i) => (
            <Video key={v.id} v={v} nomer={i + 1} igraet={igraet === v.id} zapustit={() => setIgraet(v.id)} />
          ))}
        </Karusel>
      </div>
    </section>
  );
}
