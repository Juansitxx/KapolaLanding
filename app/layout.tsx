import type { Metadata, Viewport } from "next";
import { Lobster, Nunito } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";

import { site } from "@/lib/site";
import "./globals.css";

// Provisionales: al llegar los archivos de Hug Me Tight y Branding con licencia web se declaran
// con next/font/local como --font-hug-me-tight y --font-branding, que globals.css ya prefiere.
const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Galletas artesanales y postres en Ibagué con domicilio. Arma tu pedido y envíalo por WhatsApp. El sabor que llena tu corazón.";

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl ? `https://${productionUrl}` : "http://localhost:3000"),
  title: "Kapola · Galletas artesanales en Ibagué",
  description,
  openGraph: {
    title: "Kapola · El sabor que llena tu corazón",
    description,
    locale: "es_CO",
    type: "website",
    siteName: "Kapola",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  slogan: site.slogan,
  telephone: site.whatsappDisplay,
  areaServed: { "@type": "City", name: "Ibagué" },
  address: { "@type": "PostalAddress", addressLocality: "Ibagué", addressCountry: "CO" },
  openingHours: "Mo-Sa 09:00-20:00",
  sameAs: [site.instagramUrl, site.tiktokUrl, site.facebookUrl],
  priceRange: "$",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${lobster.variable} ${nunito.variable} antialiased`}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
