"use client";

// Кнопки «Скачать PDF» и «Распечатать» над контрактом (28.10.2026, просьба
// владелицы: клиент может сохранить контракт или распечатать его).
// PDF - готовый файл public/kontrakt.pdf, его делает scripts/kontrakt-pdf.sh.
// На печати и в самом PDF кнопок нет.

export function Knopki() {
  return (
    <div className="mb-10 flex flex-wrap gap-3 print:hidden">
      <a
        href="/kontrakt.pdf"
        download="Контракт - Ульяна Кустова.pdf"
        className="inline-flex min-h-11 items-center rounded-full bg-oliva px-5 text-[15px] font-bold text-krem no-underline lg:text-base"
      >
        Скачать PDF
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 border-oliva bg-transparent px-5 text-[15px] font-bold text-oliva lg:text-base"
      >
        Распечатать
      </button>
    </div>
  );
}
