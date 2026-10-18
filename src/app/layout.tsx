import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ADRES_SAYTA } from "@/data/sayt";

const nazvanie = "Ульяна Кустова - гештальт-терапевт";
const opisanie =
  "Гештальт-терапевт для взрослых, уставших угождать и быть удобными. Онлайн и очно в Москве.";

export const metadata: Metadata = {
  metadataBase: new URL(ADRES_SAYTA),
  title: nazvanie,
  description: opisanie,
  openGraph: {
    title: nazvanie,
    description: opisanie,
    locale: "ru_RU",
    type: "website",
  },
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
