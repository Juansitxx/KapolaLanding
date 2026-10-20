import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";

import { baseUrl, site } from "@/lib/site";
import "./globals.css";

// Provisional: al llegar los archivos de Hug Me Tight y Branding con licencia web se declaran
// con next/font/local como --font-hug-me-tight y --font-branding, que globals.css ya prefiere.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Galletas artesanales y postres en Ibagué con domicilio. Arma tu pedido y envíalo por WhatsApp. El sabor que llena tu corazón.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl()),
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
  themeColor: "#fcfbfa",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "@id": `${baseUrl()}/#kapola`,
  name: site.name,
  slogan: site.slogan,
  description,
  url: baseUrl(),
  logo: `${baseUrl()}/icon.png`,
  image: `${baseUrl()}/opengraph-image.jpg`,
  telephone: site.whatsappDisplay,
  areaServed: { "@type": "City", name: "Ibagué" },
  address: { "@type": "PostalAddress", addressLocality: "Ibagué", addressCountry: "CO" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  servesCuisine: "Repostería",
  currenciesAccepted: "COP",
  sameAs: [site.instagramUrl, site.tiktokUrl, site.facebookUrl],
  priceRange: "$",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${nunito.variable} antialiased`}>
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
