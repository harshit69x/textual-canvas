import { Marquee } from "../Marquee";
import { useSkills } from "@/hooks/usePortfolioData";

export const MarqueeSection = () => {
  const { data: skills = [], isLoading } = useSkills();

  // Extract skill names from the API response
  const skillNames = skills.length > 0
    ? skills.map((skill) => skill.name.toUpperCase())
    : ["REACT", "TYPESCRIPT", "NODE.JS", "NEXT.JS", "FIGMA", "TAILWIND"];

  // Different separator icons for variety
  const separators = ["✦", "◆", "★", "●", "◈"];

  if (isLoading) {
    return (
      <section className="py-16 border-y border-border/50 overflow-hidden bg-gradient-to-r from-background via-card to-background">
        <div className="text-center text-muted-foreground animate-pulse">Loading skills...</div>
      </section>
    );
  }

  return (
    <section className="relative py-16 overflow-hidden group">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-cyan-500/5"></div>

      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      {/* Bottom Border Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      {/* Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

      {/* First Row - Main Skills */}
      <div className="hover:pause-animation">
        <Marquee className="text-display text-4xl md:text-6xl lg:text-7xl font-bold">
          {skillNames.slice(0, Math.ceil(skillNames.length / 2)).map((skill, index) => (
            <span key={index} className="mx-6 md:mx-12 inline-flex items-center gap-6 md:gap-12">
              <span className="bg-gradient-to-r from-foreground/80 via-foreground to-foreground/80 bg-clip-text text-transparent hover:from-primary hover:via-cyan-400 hover:to-primary transition-all duration-500 cursor-default">
                {skill}
              </span>
              <span className="text-2xl md:text-4xl bg-gradient-to-br from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-pulse">
                {separators[index % separators.length]}
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Second Row - Remaining Skills (Reversed) */}
      <div className="mt-6 hover:pause-animation">
        <Marquee reverse className="text-display text-4xl md:text-6xl lg:text-7xl font-bold">
          {skillNames.slice(Math.ceil(skillNames.length / 2)).map((skill, index) => (
            <span key={index} className="mx-6 md:mx-12 inline-flex items-center gap-6 md:gap-12">
              <span className="bg-gradient-to-r from-muted-foreground/60 via-muted-foreground/80 to-muted-foreground/60 bg-clip-text text-transparent hover:from-cyan-400 hover:via-primary hover:to-cyan-400 transition-all duration-500 cursor-default">
                {skill}
              </span>
              <span className="text-2xl md:text-4xl bg-gradient-to-br from-cyan-400 via-primary to-cyan-400 bg-clip-text text-transparent opacity-70">
                {separators[(index + 2) % separators.length]}
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Decorative Glowing Orbs */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
    </section>
  );
};
