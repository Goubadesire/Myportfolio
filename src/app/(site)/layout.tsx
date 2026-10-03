import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { ScrollProgress } from "@/components/effects/Reveal";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

// Le groupe (site) partage ce layout entre les pages publiques,
// sans l'appliquer à l'admin (qui n'a ni navbar ni défilement fluide).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-70" />
      <ScrollProgress />
      <Navbar />
      <main className="overflow-x-clip">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
