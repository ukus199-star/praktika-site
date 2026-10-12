import type { Metadata } from "next";
import Link from "next/link";

// Своя 404 вместо английской заглушки Next. Солнце над оливковой полосой -
// тот же мотив, что на первом экране: человек сразу видит, что он на том же
// сайте, и одним нажатием возвращается на главную или к записи.

export const metadata: Metadata = {
  title: "Такой страницы нет - Ульяна Кустова",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden">
      <Link
        href="/"
        className="mx-auto w-full max-w-[1440px] px-4 py-3 text-base font-bold text-oliva no-underline max-lg:max-w-[640px] lg:px-[min(5.56vw,80px)] lg:py-6 lg:text-lg"
      >
        Ульяна Кустова
      </Link>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 pb-48 max-lg:max-w-[640px] lg:px-[min(5.56vw,80px)] lg:pb-56">
        <h1 className="m-0 max-w-[14ch] text-[38px] leading-[1.05] font-extrabold tracking-[-0.025em] lg:text-[66px]">
          Такой страницы нет
        </h1>
        <p className="mt-4 mb-0 max-w-[34ch] text-base leading-[1.55] text-abzac lg:mt-6 lg:text-[19px]">
          Возможно, ссылка устарела или в адресе опечатка. Всё нужное - на главной.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 lg:mt-10">
          <Link
            href="/"
            className="flex min-h-12 items-center rounded-xl bg-oliva px-6 text-[15px] font-extrabold text-krem no-underline lg:text-base"
          >
            На главную
          </Link>
          <Link
            href="/#zapis"
            className="flex min-h-12 items-center rounded-xl border-2 border-oliva px-6 text-[15px] font-extrabold text-oliva no-underline lg:text-base"
          >
            Записаться на первую встречу
          </Link>
        </div>
      </div>

      {/* Солнце садится за оливковую полосу. Только украшение. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 lg:h-48">
        <div className="absolute bottom-[-90px] left-1/2 h-[360px] w-[360px] translate-x-[10%] rounded-full bg-solnce max-lg:left-auto max-lg:right-[-60px] max-lg:h-[240px] max-lg:w-[240px] max-lg:translate-x-0 lg:bottom-[-170px] lg:h-[520px] lg:w-[520px]" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-oliva lg:h-20" />
      </div>
    </main>
  );
}
