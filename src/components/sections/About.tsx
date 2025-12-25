import { ScrollReveal } from "../ScrollReveal";

export const About = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24" id="about">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
        <ScrollReveal>
          <p className="text-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
            // About Me
          </p>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Building the
            <br />
            <span className="gradient-text">future</span> of web
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              I'm a full-stack developer with over 5 years of experience building 
              digital products that make a difference. My passion lies at the 
              intersection of design and technology.
            </p>
            <p>
              I believe in the power of clean code, thoughtful UX, and relentless 
              iteration. Every pixel matters, every line of code tells a story.
            </p>
            <p className="text-foreground font-medium">
              Currently available for freelance projects and collaborations.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { number: "50+", label: "Projects Completed" },
          { number: "5+", label: "Years Experience" },
          { number: "30+", label: "Happy Clients" },
          { number: "∞", label: "Lines of Code" },
        ].map((stat, index) => (
          <ScrollReveal key={index} delay={index * 100}>
            <div className="text-center md:text-left border-l border-border pl-6">
              <p className="text-display text-4xl md:text-5xl font-bold text-primary glow-text">
                {stat.number}
              </p>
              <p className="text-mono text-sm text-muted-foreground mt-2 tracking-wide">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
