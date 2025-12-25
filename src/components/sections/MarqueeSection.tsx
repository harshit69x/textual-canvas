import { Marquee } from "../Marquee";
import { useSkills } from "@/hooks/usePortfolioData";

export const MarqueeSection = () => {
  const { data: skills = [], isLoading } = useSkills();

  // Extract skill names from the API response
  const skillNames = skills.length > 0 
    ? skills.map((skill) => skill.name.toUpperCase()) 
    : ["REACT", "TYPESCRIPT", "NODE.JS", "NEXT.JS", "FIGMA", "TAILWIND"];

  if (isLoading) {
    return (
      <section className="py-12 border-y border-border overflow-hidden">
        <div className="text-center text-muted-foreground">Loading skills...</div>
      </section>
    );
  }

  return (
    <section className="py-12 border-y border-border overflow-hidden">
      <Marquee className="text-display text-4xl md:text-6xl lg:text-8xl font-bold text-muted-foreground/20">
        {skillNames.map((skill, index) => (
          <span key={index} className="mx-8 md:mx-16">
            {skill}
            <span className="text-primary mx-8 md:mx-16">✦</span>
          </span>
        ))}
      </Marquee>

      <Marquee reverse className="text-display text-4xl md:text-6xl lg:text-8xl font-bold text-muted-foreground/20 mt-4">
        {[...skillNames].reverse().map((skill, index) => (
          <span key={index} className="mx-8 md:mx-16">
            {skill}
            <span className="text-primary mx-8 md:mx-16">◆</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
};
