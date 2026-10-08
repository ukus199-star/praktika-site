// Блок «Первая встреча и вопросы». Макеты BlokVoprosy и BlokVoprosyTel,
// правлены 08.10.2026 по разбору Impeccable: солнце в карточке меньше и
// отодвинуто от текста на 100+ px.
//
// Вопросы раскрываются штатными <details>: они работают без JavaScript,
// с клавиатуры и сами сообщают экранному диктору, открыты или нет.

const VOPROSY = [
  { q: "Как часто встречаемся?", a: "В терапевтическом сеттинге рекомендуется встречаться раз в неделю, в определённое время. Регулярность важна: пропуски влияют на эффективность и ход работы." },
  { q: "Нужно ли включать камеру?", a: "Да. На онлайн-встречах мы видим друг друга - без этого работа по видеосвязи не получается." },
  { q: "Что если нужно перенести или отменить встречу?", a: "Предупредите заранее. Если до встречи остаётся меньше 24 часов, она оплачивается полностью: это время закреплено за вами, и занять его кем-то другим я уже не успею. Это правило - часть рамки терапии, оно одинаково для всех." },
  { q: "Как оплачивать?", a: "Переводом. Первая встреча - по предоплате. Дальше можно платить после каждой встречи или пакетом." },
  { q: "Это конфиденциально?", a: "Да. Всё, что вы рассказываете, остаётся между нами." },
];

export function Voprosy() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto flex max-w-[1440px] max-lg:max-w-[640px] flex-col gap-7 px-4 py-12 lg:flex-row lg:gap-12 xl:gap-20 lg:px-[min(5.56vw,80px)] lg:py-[100px]">
        <div className="na-olive relative flex flex-col gap-3 self-start overflow-hidden rounded-[20px] bg-oliva p-6 text-krem lg:w-[40%] xl:w-[480px] lg:shrink-0 lg:gap-4 lg:rounded-[22px] lg:p-9">
          <div
            aria-hidden="true"
            className="absolute right-[-50px] bottom-[-50px] h-[100px] w-[100px] rounded-full bg-solnce lg:right-[-60px] lg:bottom-[-60px] lg:h-[140px] lg:w-[140px]"
          />
          <h2 className="relative m-0 text-[22px] leading-[1.2] font-extrabold lg:text-[30px]">
            Как проходит первая встреча
          </h2>
          <p className="relative m-0 mb-[124px] text-[15px] leading-[1.55] text-abzac-oliva lg:mb-[130px] lg:max-w-[360px] lg:text-[17px] lg:leading-[1.6]">
            На первой встрече мы знакомимся. Вы рассказываете, что происходит, я
            слушаю и спрашиваю. В конце говорю, как вижу вашу ситуацию: с чем
            здесь можно работать и чем может быть полезна терапия. Дальше
            решаете вы - продолжать или нет.
          </p>
        </div>

        <div className="flex flex-1 flex-col">
          <h2 className="m-0 mb-2 text-[28px] font-extrabold lg:mb-6 lg:text-[46px] lg:tracking-[-0.02em]">
            Вопросы
          </h2>
          <div className="flex flex-col">
            {VOPROSY.map((v, k) => (
              <details key={v.q} open={k === 0} className="group border-t border-liniya">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-bold lg:text-lg [&::-webkit-details-marker]:hidden">
                  <span>{v.q}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-solnce text-xl"
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <div className="pr-12 pb-5 text-[15px] leading-[1.6] text-abzac lg:text-[17px]">{v.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
