import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";

// Body font — clean, highly readable Hebrew sans.
const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-body",
  display: "swap",
});

// Display / quote font — classic Hebrew serif for the italic, editorial quote feel.
const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "מרין עטיה זוהר — אמנות",
  description:
    "מרין עטיה זוהר — אמנית רב-תחומית. הסיפור, היצירות, והזמנות מראש. גלריה אישית ופרטי יצירת קשר.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} ${frankRuhl.variable}`}>
      <body>{children}</body>
    </html>
  );
}
