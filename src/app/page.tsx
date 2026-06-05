import { Navbar } from "@/components/Navbar";
import { MENU_ITEMS } from "@/config/navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Infrastructure } from "@/components/Infrastructure";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar items={MENU_ITEMS} />
      <Hero />
      <Features />
      <Pricing />
      <Infrastructure />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
