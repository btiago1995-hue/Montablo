import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

export const viewport: Viewport = {
  themeColor: "#2C3E2D",
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18093408110"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18093408110');
          `}
        </Script>
      </head>
      <body className={`${dmSans.variable} ${dmSerif.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
