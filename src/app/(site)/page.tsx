import { Hero } from "@/components/site/Hero";
import { Manifesto } from "@/components/site/Manifesto";
import { About } from "@/components/site/About";
import { Approach } from "@/components/site/Approach";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";
import { Contact } from "@/components/site/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <About />
      <Approach />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
