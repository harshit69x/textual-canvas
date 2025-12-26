import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { About } from "@/components/sections/About";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { Work } from "@/components/sections/Work";
import { BlogSection } from "@/components/sections/BlogSection";
import { Contact } from "@/components/sections/Contact";

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <Hero />
      <MarqueeSection />
      <About />
      <SkillsSection />
      <Work />
      <BlogSection />
      <Contact />
    </main>
  );
};

export default Index;
