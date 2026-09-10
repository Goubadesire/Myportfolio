import Hero from "@/components/shared/Hero";
import Projects from "@/components/shared/Projects";
import Skills from "@/components/shared/Skills";
import About from "@/components/shared/About";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
      <Hero />
      <About />
      <Projects />
      <Skills />
    </main>
  );
}