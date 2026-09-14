import type { Metadata, Viewport } from "next";
import { Lobster, Nunito } from "next/font/google";

import { site } from "@/lib/site";
import "./globals.css";

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
  "Galletas artesanales y postres en Ibagué con domicilio. Arma tu pedido y envíalo por WhatsApp. El sabor que te llena el corazón.";

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl ? `https://${productionUrl}` : "http://localhost:3000"),
  title: "Kapola · Galletas artesanales en Ibagué",
  description,
  openGraph: {
    title: "Kapola · El sabor que te llena el corazón",
    description,
    locale: "es_CO",
    type: "website",
    siteName: "Kapola",
  },
};

export const viewport: Viewport = {
  themeColor: "#fde4ee",
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
      </body>
    </html>
  );
}
