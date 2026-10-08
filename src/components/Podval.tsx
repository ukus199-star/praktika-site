import { DOKUMENTY, INN, POCHTA, TELEGRAM } from "@/data/sayt";

// Подвал на оливе. Макеты BlokZapis и BlokZapisTel. Ссылки - с зоной
// нажатия от 44 px и промежутком (разбор Impeccable 08.10.2026).

export function Podval() {
  const ssylka = "flex min-h-11 items-center text-krem underline underline-offset-4";
  return (
    <footer className="na-olive bg-oliva text-[15px] leading-[1.6] text-krem">
      <div className="mx-auto flex max-w-[1440px] max-lg:max-w-[640px] flex-col gap-5 px-4 py-7 lg:flex-row lg:justify-between lg:gap-[18px] lg:px-[min(5.56vw,80px)] lg:py-10">
        <div>
          <div className="font-extrabold">Ульяна Кустова, гештальт-терапевт</div>
          <div className="text-priglush">ИНН {INN}</div>
        </div>
        <div className="flex flex-col">
          <a href={DOKUMENTY.politika} className={ssylka}>
            Политика обработки персональных данных
          </a>
          <a href={DOKUMENTY.soglasie} className={ssylka}>
            Согласие на обработку
          </a>
        </div>
        <div className="flex flex-col">
          <a href={TELEGRAM.ssylka} className={ssylka}>
            Telegram
          </a>
          <a href={`mailto:${POCHTA}`} className={ssylka}>
            {POCHTA}
          </a>
        </div>
        <div className="max-w-[260px] text-priglush">
          Психологическое консультирование не является медицинской услугой.
        </div>
      </div>
    </footer>
  );
}
