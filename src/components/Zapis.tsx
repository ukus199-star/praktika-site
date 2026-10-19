"use client";

import { useEffect, useState, type FormEvent } from "react";
import { TELEGRAM } from "@/data/sayt";

// Блок «Запись». Макеты BlokZapis и BlokZapisTel, версия холста 47
// (08.10.2026): круг с фото владелицы рядом с формой (на телефоне - под
// кнопкой), поля с затемнённой рамкой, состояния формы.
//
// Поля - решение 2 плана сайта от 24.09.2026. Чего здесь нет намеренно:
// вопроса «с чем вы идёте» - сведения о психическом состоянии по 152-ФЗ
// особая категория данных, запрос человек расскажет на встрече.

type Sostoyanie = "forma" | "otpravka" | "uspekh" | "oshibka" | "chasto";

/** Отправка заявки на сервер (`src/app/api/zapis/route.ts`), оттуда - письмом
 *  на рабочую почту владелицы. Фаза 4 плана сайта. Возвращает итог для
 *  состояния формы. */
async function otpravitZayavku(dannye: FormData): Promise<"uspekh" | "oshibka" | "chasto"> {
  try {
    const otvet = await fetch("/api/zapis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imya: dannye.get("imya"),
        svyaz: dannye.get("svyaz"),
        vremya: dannye.get("vremya"),
        otkuda: dannye.get("otkuda"),
        soglasie: dannye.get("soglasie") === "on",
        lovushka: dannye.get("sayt"),
      }),
    });
    if (otvet.ok) return "uspekh";
    return otvet.status === 429 ? "chasto" : "oshibka";
  } catch {
    return "oshibka";
  }
}

function Pole({
  id,
  nadpis,
  primer,
  obyazatelno,
  avtozapolnenie,
}: {
  id: string;
  nadpis: string;
  primer: string;
  obyazatelno?: boolean;
  avtozapolnenie?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[15px] font-bold lg:text-base">
        {nadpis}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        placeholder={primer}
        required={obyazatelno}
        autoComplete={avtozapolnenie}
        maxLength={200}
        className="h-[52px] rounded-xl border-[1.5px] border-ramka bg-pole px-4 text-base text-tekst lg:text-[17px]"
      />
    </div>
  );
}

function KrugFoto({ klass }: { klass: string }) {
  // Фото прислала владелица 09.10.2026: крупный план, по кругу, без
  // золотого фона. Квадрат вырезан по лицу, 900×900.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/foto-krug.jpg"
      alt="Ульяна Кустова"
      width={900}
      height={900}
      loading="lazy"
      className={`${klass} rounded-full object-cover`}
    />
  );
}

function KnopkaTelegram({ klass = "" }: { klass?: string }) {
  return (
    <a
      href={TELEGRAM.ssylka}
      className={`${klass} flex min-h-[52px] items-center justify-center rounded-[14px] border-2 border-oliva px-6 text-[15px] font-extrabold text-oliva no-underline lg:text-[17px]`}
    >
      Написать в Telegram · {TELEGRAM.imya}
    </a>
  );
}

export function Zapis() {
  const [sostoyanie, setSostoyanie] = useState<Sostoyanie>("forma");
  // Включена ли форма на сервере. Пока неизвестно или выключена - полей нет,
  // только кнопка «Написать»: форма включается после подачи изменений в
  // уведомление Роскомнадзора (решение владелицы 19.10.2026 - не показывать
  // форму, которая не отправляет).
  const [formaVklyuchena, setFormaVklyuchena] = useState(false);

  useEffect(() => {
    let otmeneno = false;
    fetch("/api/zapis", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { vklyucheno?: boolean } | null) => {
        if (!otmeneno) setFormaVklyuchena(d?.vklyucheno === true);
      })
      .catch(() => {});
    return () => {
      otmeneno = true;
    };
  }, []);

  async function otpravit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSostoyanie("otpravka");
    setSostoyanie(await otpravitZayavku(new FormData(e.currentTarget)));
  }

  return (
    <section id="zapis" className="overflow-hidden">
      <div className="mx-auto flex max-w-[1440px] max-lg:max-w-[640px] flex-col gap-24 px-4 py-12 lg:flex-row lg:px-[min(5.56vw,80px)] lg:py-[100px]">
        <div className="flex flex-col gap-4 lg:w-[52%] xl:w-[600px] lg:shrink-0 lg:gap-5">
          <h2 className="m-0 text-[28px] leading-[1.15] font-extrabold lg:text-[46px] lg:leading-[1.1] lg:tracking-[-0.02em]">
            Записаться на первую встречу
          </h2>
          <p className="m-0 text-base leading-[1.55] text-abzac lg:mb-2 lg:text-lg lg:leading-[1.6]">
            {formaVklyuchena
              ? "Оставьте контакты - я напишу, и мы договоримся о времени. Или напишите сами в Telegram."
              : "Напишите мне в Telegram - договоримся о времени первой встречи."}
          </p>
          <KnopkaTelegram klass="lg:hidden" />

          {!formaVklyuchena ? null : sostoyanie === "uspekh" ? (
            <div role="status" className="na-olive flex flex-col gap-2 rounded-[20px] bg-oliva p-6 text-krem lg:p-8">
              <div className="text-2xl font-extrabold lg:text-[30px]">Заявка у меня</div>
              <div className="text-base leading-[1.55] text-priglush lg:text-lg">Отвечу в течение дня.</div>
            </div>
          ) : (
            <form onSubmit={otpravit} className="flex flex-col gap-4">
              <Pole id="imya" nadpis="Как к вам обращаться" primer="Имя" obyazatelno avtozapolnenie="given-name" />
              <Pole id="svyaz" nadpis="Как с вами связаться" primer="Телефон, почта или ник в мессенджере" obyazatelno />
              <Pole id="vremya" nadpis="Когда вам удобно" primer="Например, будни после 19:00" />
              <Pole id="otkuda" nadpis="Как вы обо мне узнали?" primer="Своими словами" />
              <label className="flex min-h-11 items-start gap-3 text-sm leading-[1.45] text-abzac lg:text-[15px]">
                <input type="checkbox" name="soglasie" required className="mt-0.5 h-[22px] w-[22px] shrink-0 accent-oliva" />
                <span>
                  Даю{" "}
                  <a href="/soglasie-zapis" target="_blank" className="font-bold text-tekst underline-offset-4">
                    согласие на обработку персональных данных
                  </a>{" "}
                  для записи на консультацию
                </span>
              </label>
              {/* Ловушка для роботов: человек это поле не видит и не заполняет.
                  Заполнено - сервер молча отбрасывает заявку. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="sayt">Сайт</label>
                <input id="sayt" name="sayt" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <button
                type="submit"
                disabled={sostoyanie === "otpravka"}
                className="h-15 rounded-[14px] bg-oliva text-[17px] font-extrabold text-krem disabled:opacity-70 lg:text-lg"
              >
                {sostoyanie === "otpravka" ? "Отправляем…" : "Отправить заявку"}
              </button>
              {sostoyanie === "chasto" && (
                <div role="alert" className="text-[15px] leading-normal lg:text-base">
                  Заявок с этого устройства было много подряд. Подождите несколько
                  минут или напишите мне в Telegram.
                </div>
              )}
              {sostoyanie === "oshibka" && (
                <div role="alert" className="flex items-start gap-2.5 text-[15px] leading-normal lg:text-base">
                  <span aria-hidden="true" className="mt-[5px] h-3 w-3 shrink-0 rounded-full bg-solnce" />
                  <span>
                    Не получилось отправить. Попробуйте ещё раз или{" "}
                    <a href={TELEGRAM.ssylka} className="font-bold underline-offset-4">
                      напишите мне в Telegram
                    </a>
                    .
                  </span>
                </div>
              )}
            </form>
          )}

          <KrugFoto klass="mt-6 h-60 w-60 self-center lg:hidden" />
        </div>

        <div className="hidden flex-1 flex-col items-center justify-center gap-9 lg:flex">
          <KrugFoto klass="h-[320px] w-[320px] xl:h-[420px] xl:w-[420px]" />
          <KnopkaTelegram />
        </div>
      </div>
    </section>
  );
}
