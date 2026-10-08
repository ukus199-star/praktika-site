import { PervyEkran } from "@/components/PervyEkran";
import { Koleso } from "@/components/Koleso";
import { BlokTest } from "@/components/BlokTest";
import { OboMne } from "@/components/OboMne";
import { KakYaRabotayu } from "@/components/KakYaRabotayu";
import { Ceny } from "@/components/Ceny";
import { Otzyvy } from "@/components/Otzyvy";
import { Voprosy } from "@/components/Voprosy";
import { Zapis } from "@/components/Zapis";
import { Podval } from "@/components/Podval";

// Главная. Порядок блоков - «Структура главной» в плане сайта и макеты на
// холсте, фаза 2.
export default function Glavnaya() {
  return (
    <>
      <main>
        <PervyEkran />
        <Koleso />
        <BlokTest />
        <OboMne />
        <KakYaRabotayu />
        <Ceny />
        <Otzyvy />
        <Voprosy />
        <Zapis />
      </main>
      <Podval />
    </>
  );
}
