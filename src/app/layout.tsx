import type { Metadata, Viewport } from "next";
import "./globals.css";

const nazvanie = "Ульяна Кустова - гештальт-терапевт";
const opisanie =
  "Терапия для профи, уставших быть удобными. Онлайн и очно в Москве.";

export const metadata: Metadata = {
  title: nazvanie,
  description: opisanie,
  openGraph: {
    title: nazvanie,
    description: opisanie,
    locale: "ru_RU",
    type: "website",
  },
  // Пока сайт живёт на временном адресе, поисковикам его показывать рано:
  // на нём заглушки вместо фото и отзывов. Снять в фазе 5, при переезде на
  // kustova-psy.ru.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f6eedf",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="antialiased">
      <body className="font-sans">{children}</body>
    </html>
  );
}
