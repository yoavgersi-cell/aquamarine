import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre, Suez_One } from "next/font/google";
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

// Name & headings display font — bold Hebrew display serif.
const suezOne = Suez_One({
  subsets: ["hebrew", "latin"],
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "מרין אטיה זוהר — אמנות",
  description:
    "מרין אטיה זוהר — אומנות רב-תחומית. הסיפור, היצירות, והזמנות מראש. גלריה אישית ופרטי יצירת קשר.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} ${frankRuhl.variable} ${suezOne.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
