import { DLITELNOST_VSTRECHI } from "@/data/sayt";

// Блок «Как я работаю» вместе с «Если вас что-то останавливает». Макеты
// BlokRabota и BlokRabotaTel; текст о методе переписан словами владелицы
// 05.10.2026 - business/products/site-texts.md, блок 5.

const FAKTY = [
  "Онлайн по видеосвязи или очно в Москве",
  DLITELNOST_VSTRECHI,
  "Обычно раз в неделю, в одно и то же время",
  "Всё, что вы рассказываете, остаётся между нами",
];

const SOMNENIYA = [
  { vopros: "«Я сам справлюсь»", otvet: "Вы и правда умеете справляться - на этом многое держится. Терапия не о том, что вы не справляетесь. Она о том, чтобы не тащить всё в одиночку." },
  { vopros: "«Мне не так уж плохо»", otvet: "Для терапии не нужно доводить до края. Приходят и с тем, что «в целом нормально, но устал(а) быть удобным»." },
  { vopros: "«А вдруг не поможет»", otvet: "На первой встрече мы оба увидим, подходит ли вам такая работа. Если я пойму, что с вашим запросом лучше к другому специалисту, скажу прямо и подскажу, к кому." },
  { vopros: "«Не знаю, с чего начать»", otvet: "Так бывает чаще, чем кажется. Можно прийти и сказать: «Не знаю, что со мной». Дальше я спрашиваю сама." },
];

export function KakYaRabotayu() {
  const abzac = "m-0 text-base leading-[1.6] text-abzac lg:text-lg";
  return (
    <section id="kak-ya-rabotayu" className="relative overflow-hidden">
      {/* Солнце выглядывает из правого верхнего угла. На телефоне текст
          опущен на 128 px, чтобы солнце его не задевало (правка 05.10.2026). */}
      <div
        aria-hidden="true"
        className="absolute top-[-150px] right-[-90px] h-60 w-60 rounded-full bg-solnce lg:top-[-220px] lg:right-[calc(50%-940px)] lg:h-[520px] lg:w-[520px]"
      />
      <div className="relative mx-auto flex max-w-[1440px] max-lg:max-w-[640px] flex-col gap-12 px-4 pt-32 pb-12 lg:gap-[72px] lg:px-[min(5.56vw,80px)] lg:py-[72px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-24">
          <div className="flex flex-1 flex-col gap-4 lg:gap-5">
            <h2 className="m-0 text-[28px] leading-[1.15] font-extrabold tracking-[-0.015em] lg:mb-2 lg:text-[46px] lg:leading-[1.1] lg:tracking-[-0.02em]">
              Как я работаю
            </h2>
            <p className={abzac}>
              Я работаю в гештальт-подходе. Это наблюдение и исследование себя:
              что вы чувствуете, что замечаете в теле, как рассказываете, что
              происходит между нами прямо сейчас.
            </p>
            <p className={abzac}>
              Погружение в себя помогает понять, что происходит с вами и с вашей
              жизнью, куда уходят силы и энергия. Когда это становится видно,
              появляется выбор - и силы можно направить на другое.
            </p>
            <p className="my-2 text-2xl leading-tight font-extrabold text-oliva lg:text-[30px] lg:leading-[1.25]">
              Там, где раньше был привычный сценарий, появляется выбор
            </p>
            <h3 className="m-0 mt-3 text-[22px] font-extrabold lg:text-[26px]">
              Путь, который проходите вы
            </h3>
            <p className={abzac}>
              Мне близка метафора путешествия. Вы идёте искать свои ответы, я -
              ваш сопровождающий. У каждого путь свой: где-то будут препятствия,
              где-то отголоски прошлого, где-то новые вершины, взлёты и падения.
              Пройти этот путь за вас я не могу. Но могу быть рядом на всём его
              протяжении - в этом я вижу свою задачу.
            </p>
            <p className={abzac}>
              Такая работа требует глубины и честности с собой. Поэтому от меня -
              конфиденциальность, уважение и безопасное пространство для любых
              ваших частей и чувств, с которыми мы встретимся по пути.
            </p>
          </div>
          <ul className="m-0 flex list-none flex-col gap-4 p-0 lg:w-[36%] xl:w-[440px] lg:shrink-0 lg:gap-[18px] lg:pt-[330px]">
            {FAKTY.map((f) => (
              <li key={f} className="flex items-start gap-3.5 text-base leading-[1.45] font-semibold lg:text-[17px]">
                <span aria-hidden="true" className="mt-[5px] h-3.5 w-3.5 shrink-0 rounded-full bg-solnce" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5 lg:gap-6">
          <h3 className="m-0 text-2xl font-extrabold lg:text-[28px]">
            Если вас что-то останавливает
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 lg:gap-4">
            {SOMNENIYA.map((s) => (
              <div key={s.vopros} className="flex flex-col gap-2.5 rounded-[18px] bg-kartochka p-5 lg:p-6">
                <div className="text-lg font-extrabold lg:text-[19px]">{s.vopros}</div>
                <div className="text-[15px] leading-[1.55] text-abzac lg:text-base">{s.otvet}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
