"use client";

import { useState } from "react";

// Шапка: имя, меню, «Записаться». На телефоне меню прячется за кнопку -
// макет Telefon2. Шапка не липкая: в макете её нет при прокрутке.

const PUNKTY = [
  { href: "#obo-mne", tekst: "Обо мне" },
  { href: "#kak-ya-rabotayu", tekst: "Как я работаю" },
  { href: "#ceny", tekst: "Цены" },
  { href: "#test", tekst: "Тест" },
];

export function Shapka() {
  const [otkryto, setOtkryto] = useState(false);

  return (
    <header className="relative z-20 mx-auto flex max-w-[1440px] max-lg:max-w-[640px] items-center justify-between gap-4 px-4 py-3 lg:px-[min(5.56vw,80px)] lg:py-6">
      <a
        href="#"
        className="text-base font-bold text-oliva no-underline lg:text-lg"
      >
        Ульяна Кустова
      </a>

      <nav aria-label="Разделы" className="hidden items-center gap-4 lg:flex">
        {PUNKTY.map((p) => (
          <a
            key={p.href}
            href={p.href}
            className="px-3 py-3 text-[15px] no-underline hover:text-oliva"
          >
            {p.tekst}
          </a>
        ))}
        <a
          href="#zapis"
          className="ml-4 rounded-xl bg-oliva px-[22px] py-3 text-[15px] font-extrabold text-krem no-underline"
        >
          Записаться
        </a>
      </nav>

      <div className="flex items-center gap-1 lg:hidden">
        <a
          href="#zapis"
          className="flex min-h-11 items-center rounded-xl bg-oliva px-3.5 text-sm font-extrabold text-krem no-underline"
        >
          Записаться
        </a>
        <button
          type="button"
          aria-label={otkryto ? "Закрыть меню" : "Меню"}
          aria-expanded={otkryto}
          aria-controls="menyu-telefon"
          onClick={() => setOtkryto(!otkryto)}
          className="flex h-11 w-11 items-center justify-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {otkryto ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {otkryto && (
        <nav
          id="menyu-telefon"
          aria-label="Разделы"
          className="absolute inset-x-4 top-full flex flex-col rounded-2xl bg-krem p-2 shadow-[0_12px_32px_rgba(30,27,22,0.16)] lg:hidden"
        >
          {PUNKTY.map((p) => (
            <a
              key={p.href}
              href={p.href}
              onClick={() => setOtkryto(false)}
              className="flex min-h-12 items-center rounded-xl px-4 text-base font-semibold no-underline"
            >
              {p.tekst}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
