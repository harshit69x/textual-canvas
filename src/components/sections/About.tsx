import { ScrollReveal } from "../ScrollReveal";
import { useProfile, useProjects, useSkills, useExperiences } from "@/hooks/usePortfolioData";

export const About = () => {
  const { data: profile } = useProfile();
  const { data: projects = [] } = useProjects();
  const { data: skills = [] } = useSkills();
  const { data: experiences = [] } = useExperiences();

  // Calculate years of experience from experience data
  const calculateYearsOfExperience = () => {
    if (experiences.length === 0) return 5;
    
    const earliestDate = experiences.reduce((earliest, exp) => {
      const startDate = new Date(exp.startDate);
      return startDate < earliest ? startDate : earliest;
    }, new Date());
    
    const years = Math.floor((new Date().getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
    return Math.max(years, 1);
  };

  const yearsExp = calculateYearsOfExperience();

  const stats = [
    { number: `${projects.length || 50}+`, label: "Projects Completed" },
    { number: `${yearsExp}+`, label: "Years Experience" },
    { number: `${skills.length || 30}+`, label: "Skills Mastered" },
    { number: `${experiences.length || 3}+`, label: "Companies Worked" },
  ];

  const bio = profile?.bio || "I'm a full-stack developer with over 5 years of experience building digital products that make a difference. My passion lies at the intersection of design and technology.";
  const isAvailable = profile?.isAvailable ?? true;

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
            <p>{bio}</p>
            <p>
              I believe in the power of clean code, thoughtful UX, and relentless 
              iteration. Every pixel matters, every line of code tells a story.
            </p>
            {isAvailable && (
              <p className="text-foreground font-medium">
                Currently available for freelance projects and collaborations.
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
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

      {/* Experience Timeline */}
      {experiences.length > 0 && (
        <div className="max-w-6xl mx-auto mt-32">
          <ScrollReveal>
            <p className="text-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
              // Experience
            </p>
            <h3 className="text-display text-3xl md:text-4xl font-bold mb-12">
              Where I've <span className="gradient-text">worked</span>
            </h3>
          </ScrollReveal>

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              // Format location - handle both string and object formats
              const formatLocation = () => {
                if (!exp.location) return null;
                if (typeof exp.location === "string") return exp.location;
                const { city, state, country } = exp.location;
                const parts = [city, state, country].filter(Boolean);
                return parts.length > 0 ? parts.join(", ") : null;
              };
              const expLocation = formatLocation();

              return (
                <ScrollReveal key={exp._id} delay={index * 100}>
                  <div className="border-l-2 border-primary/30 pl-6 py-4 hover:border-primary transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <h4 className="text-xl font-bold text-foreground">{exp.position}</h4>
                      <span className="text-mono text-sm text-muted-foreground">
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                      </span>
                    </div>
                    <p className="text-primary font-medium mb-2">{exp.company}</p>
                    {expLocation && (
                      <p className="text-muted-foreground text-sm mb-3">
                        📍 {expLocation} {exp.locationType && `• ${exp.locationType}`}
                      </p>
                    )}
                    {exp.description && (
                      <p className="text-muted-foreground mb-3">{exp.description}</p>
                    )}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.slice(0, 6).map((tech, i) => (
                          <span
                            key={i}
                            className="text-mono text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
