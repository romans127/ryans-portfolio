import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Atmosphere from "@/components/Atmosphere";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ryan Watts — Principal AI & Data Engineer",
  description:
    "Principal AI & Data Engineer with 15+ years architecting transformative AI solutions, enterprise data platforms, and cybersecurity intelligence systems.",
  keywords: [
    "Ryan Watts",
    "Principal AI Engineer",
    "Data Engineer",
    "AI Architecture",
    "Machine Learning",
    "Data Platform",
    "LLM",
    "Agentic AI",
  ],
  authors: [{ name: "Ryan Watts" }],
  creator: "Ryan Watts",
  openGraph: {
    title: "Ryan Watts — Principal AI & Data Engineer",
    description:
      "Principal AI & Data Engineer with 15+ years architecting transformative AI solutions and enterprise data platforms.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Watts — Principal AI & Data Engineer",
    description:
      "Principal AI & Data Engineer with 15+ years architecting transformative AI solutions and enterprise data platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Atmosphere />
        <div className="site-shell min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
