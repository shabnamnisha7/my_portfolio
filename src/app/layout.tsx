import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.fixed.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Shabnam Nisha | Cinematic Portfolio",
  description:
    "Premium portfolio of Shabnam Nisha, an ECE student exploring embedded systems, AI concepts, creative storytelling, and future-facing digital experiences.",
  keywords: [
    "Shabnam Nisha",
    "ECE student portfolio",
    "embedded systems",
    "creative technologist",
    "Hyderabad",
  ],
  openGraph: {
    title: "Shabnam Nisha | Cinematic Portfolio",
    description:
      "An immersive portfolio experience blending engineering, storytelling, and motion-led design.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shabnam Nisha | Cinematic Portfolio",
    description:
      "An immersive portfolio experience blending engineering, storytelling, and motion-led design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${display.variable} bg-ink font-sans text-white`}>
        {children}
      </body>
    </html>
  );
}
