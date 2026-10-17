import type { Metadata } from "next";
import { Noto_Sans_JP, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* Japanese + Latin body font. */
const notoSansJP = Noto_Sans_JP({
  variable: "--font-jp",
  subsets: ["latin"],
  display: "swap",
});

/* Display font for Latin headings. */
const outfit = Outfit({
  variable: "--font-displayface",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NihongoVerse — Learn Japanese. Live the Journey.",
    template: "%s | NihongoVerse",
  },
  description:
    "Learn Japanese the anime way — JLPT courses from N5 to N1 with Hinglish explanations, made for Indian learners.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${notoSansJP.variable} ${outfit.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-midnight text-ink font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
