import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";
import Atmosphere from "@/components/Atmosphere";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { CSPostHogProvider } from "@/app/providers";
import { profile } from "@/lib/site";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.lede,
  keywords: [
    "Ryan Watts",
    "Director of Data",
    "Head of AI",
    "Data Engineer",
    "Agentic AI",
    "MCP",
    "dbt",
    "BigQuery",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.lede,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.lede,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <CSPostHogProvider>
          <Atmosphere />
          <SmoothScroll>
            <div className="site-shell flex min-h-screen flex-col">
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
