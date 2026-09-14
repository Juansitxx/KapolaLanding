import { CartProvider } from "@/components/cart/cart-provider";
import { FloatingCart } from "@/components/cart/floating-cart";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { MenuSection } from "@/components/menu/menu-section";
import { Gifts } from "@/components/gifts";
import { About } from "@/components/about";
import { Community } from "@/components/community";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <CartProvider>
      <SiteHeader />
      <main>
        <Hero />
        <MenuSection />
        <Gifts />
        <About />
        <Community />
        <Contact />
      </main>
      <SiteFooter />
      <FloatingCart />
    </CartProvider>
  );
}
