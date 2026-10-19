// Отправка заявки письмом на рабочую почту владелицы. Только для сервера.
//
// Почта - VK WorkSpace (домен kustova-psy.ru), Россия. Письмо отправляет сам
// ящик ulyana@kustova-psy.ru себе же: сайт входит в него по паролю
// приложения, а не по основному паролю. Решение 12.10.2026 - заявка целиком
// идёт на почту, без Telegram, чтобы не было передачи данных за рубеж.
// Уведомление о новом письме даёт приложение «Почта» на iPhone (решение
// владелицы 19.10.2026).
//
// Настройки - в переменных окружения на Amvera, в коде их нет:
//   ZAPIS_POCHTA         адрес ящика, он же получатель - ulyana@kustova-psy.ru
//   ZAPIS_POCHTA_PAROL   пароль приложения VK WorkSpace, секрет
//   ZAPIS_SMTP           почтовый сервер, по умолчанию smtp.mail.ru
//                        (сервер VK для ящиков на своём домене)

import nodemailer from "nodemailer";
import type { Zayavka } from "@/lib/zayavka";

type Nastroyki = { adres: string; parol: string; server: string };

export function nastroykiPochty(): Nastroyki | null {
  const adres = process.env.ZAPIS_POCHTA?.trim();
  const parol = process.env.ZAPIS_POCHTA_PAROL?.trim();
  if (!adres || !parol) return null;
  return { adres, parol, server: process.env.ZAPIS_SMTP?.trim() || "smtp.mail.ru" };
}

// Похоже ли поле «как связаться» на почту. Если да - ответ на письмо уйдёт
// прямо человеку, кнопкой «Ответить».
function pohozheNaPochtu(svyaz: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(svyaz);
}

/** Отправляет заявку. Бросает ошибку, если почтовый сервер не принял письмо. */
export async function otpravitZayavkuPismom(n: Nastroyki, z: Zayavka): Promise<void> {
  const transport = nodemailer.createTransport({
    host: n.server,
    port: 465,
    secure: true,
    auth: { user: n.adres, pass: n.parol },
    // Не ждать почтовый сервер дольше, чем человек готов смотреть на кнопку.
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });

  // Только текст, без HTML: в письмо не попадёт ничего, что почтовая программа
  // могла бы выполнить или показать иначе, чем написал человек.
  const tekst = [
    "Новая заявка на первую встречу с сайта kustova-psy.ru.",
    "",
    `Как обращаться: ${z.imya}`,
    `Как связаться: ${z.svyaz}`,
    `Когда удобно: ${z.vremya || "не указано"}`,
    `Откуда узнали: ${z.otkuda || "не указано"}`,
    "",
    "Человек отметил согласие на обработку персональных данных",
    "(kustova-psy.ru/soglasie-zapis). Заявка на сервере сайта не хранится -",
    "это письмо единственная её копия.",
  ].join("\n");

  await transport.sendMail({
    from: { name: "Сайт kustova-psy.ru", address: n.adres },
    to: n.adres,
    replyTo: pohozheNaPochtu(z.svyaz) ? z.svyaz : undefined,
    subject: `Заявка на встречу: ${z.imya}`,
    text: tekst,
  });
}
