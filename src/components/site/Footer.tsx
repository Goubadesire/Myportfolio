import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Conçu et développé avec Next.js, Prisma et beaucoup de volts.
        </p>
        <div className="flex gap-6">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            E-mail
          </a>
          <a href="#top" className="hover:text-white">
            Haut de page ↑
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="mt-12 select-none whitespace-nowrap text-center text-[clamp(4rem,17vw,15rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent bg-linear-to-b from-white/20 to-transparent bg-clip-text"
      >
        {site.name}
      </p>
    </footer>
  );
}
