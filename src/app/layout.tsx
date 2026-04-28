import type { Metadata, Viewport } from "next";
import { Work_Sans, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { CookieBanner } from "@/components/public/cookie-banner";
import { AnalyticsScripts } from "@/components/public/analytics-scripts";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

export const viewport: Viewport = {
  themeColor: "#1E3932",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.montablo.com"),
  title: "MonTablo — Menu digital pour restaurants",
  description:
    "Créez votre menu digital interactif en quelques minutes. QR code, mises à jour en temps réel, design premium.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MonTablo",
  },
  openGraph: {
    title: "MonTablo — Menu digital pour restaurants",
    description:
      "Créez votre menu digital interactif en quelques minutes. QR code, mises à jour en temps réel, design premium.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MonTablo — Menu digital pour restaurants",
    description:
      "Créez votre menu digital interactif en quelques minutes. QR code, mises à jour en temps réel, design premium.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${workSans.variable} ${fraunces.variable} font-sans`}>
        {children}
        <CookieBanner />
        <AnalyticsScripts />
        <Analytics />
      </body>
    </html>
  );
}
