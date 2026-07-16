import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import Providers from "./providers";
import "./globals.css";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
  "https://mysticstudio.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: {
    default: "Mystic Studio | Tarot, rituales y biblioteca esotérica",
    template: "%s | Mystic Studio",
  },

  description:
    "Explora lecturas de tarot, significados de las 78 cartas, rituales tradicionales, limpias y simbolismo esotérico en una experiencia digital inmersiva.",

  applicationName: "Mystic Studio",

  authors: [
    {
      name: "Mystic Studio",
      url: APP_URL,
    },
  ],

  creator: "Mystic Studio",
  publisher: "Mystic Studio",

  category: "Espiritualidad y esoterismo",

  keywords: [
    "tarot",
    "tarot online",
    "lectura de tarot",
    "lectura de cartas",
    "cartas del tarot",
    "significado de las cartas del tarot",
    "tarot en español",
    "tarot México",
    "arcanos mayores",
    "arcanos menores",
    "rituales",
    "rituales tradicionales",
    "limpias espirituales",
    "grimorio",
    "esoterismo",
    "simbolismo",
    "espiritualidad",
    "folklore",
    "biblioteca esotérica",
    "Mystic Studio",
  ],

  alternates: {
    canonical: "/",
    languages: {
      "es-MX": "/",
    },
  },

  openGraph: {
    type: "website",
    locale: "es_MX",
    url: APP_URL,
    siteName: "Mystic Studio",
    title: "Mystic Studio | Tarot, rituales y biblioteca esotérica",
    description:
      "Descubre las 78 cartas del tarot, lecturas personalizadas, rituales tradicionales y simbolismo esotérico dentro de un estudio digital inmersivo.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mystic Studio | Tarot y biblioteca esotérica",
    description:
      "Explora lecturas de tarot, las 78 cartas, rituales tradicionales y simbolismo dentro de una experiencia mística inmersiva.",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  referrer: "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050308",
  colorScheme: "dark",
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mystic Studio",
  alternateName: "MysticStudio",
  url: APP_URL,
  inLanguage: "es-MX",
  description:
    "Experiencia digital inmersiva para explorar tarot, rituales tradicionales, limpias, folklore y simbolismo esotérico.",
  publisher: {
    "@type": "Organization",
    name: "Mystic Studio",
    url: APP_URL,
  },
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mystic Studio",
  url: APP_URL,
  description:
    "Estudio digital dedicado al tarot, el simbolismo, las tradiciones esotéricas y la exploración cultural del ocultismo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />

        <Providers>{children}</Providers>

        <Analytics />
      </body>
    </html>
  );
}