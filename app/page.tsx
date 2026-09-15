import { CartProvider } from "@/components/cart/cart-provider";
import { FloatingCart } from "@/components/cart/floating-cart";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Inside } from "@/components/inside";
import { MenuSection } from "@/components/menu/menu-section";
import { Desserts } from "@/components/desserts";
import { Gifts } from "@/components/gifts";
import { About } from "@/components/about";
import { Community } from "@/components/community";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <CartProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Inside />
        <MenuSection />
        <Desserts />
        <Gifts />
        <About />
        <Community />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <FloatingCart />
    </CartProvider>
  );
}
