import { Marquee } from "../Marquee";

const skills = [
  "REACT",
  "TYPESCRIPT",
  "NODE.JS",
  "NEXT.JS",
  "FIGMA",
  "TAILWIND",
  "POSTGRESQL",
  "GRAPHQL",
  "AWS",
  "DOCKER",
];

export const MarqueeSection = () => {
  return (
    <section className="py-12 border-y border-border overflow-hidden">
      <Marquee className="text-display text-4xl md:text-6xl lg:text-8xl font-bold text-muted-foreground/20">
        {skills.map((skill, index) => (
          <span key={index} className="mx-8 md:mx-16">
            {skill}
            <span className="text-primary mx-8 md:mx-16">✦</span>
          </span>
        ))}
      </Marquee>

      <Marquee reverse className="text-display text-4xl md:text-6xl lg:text-8xl font-bold text-muted-foreground/20 mt-4">
        {[...skills].reverse().map((skill, index) => (
          <span key={index} className="mx-8 md:mx-16">
            {skill}
            <span className="text-primary mx-8 md:mx-16">◆</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
};
