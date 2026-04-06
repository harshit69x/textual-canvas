import { ScrollReveal } from "../ScrollReveal";
import { useProfile, useProjects, useSkills, useExperiences } from "@/hooks/usePortfolioData";

export const About = () => {
  const { data: profile } = useProfile();
  const { data: projects = [] } = useProjects();
  const { data: skills = [] } = useSkills();
  const { data: experiences = [] } = useExperiences();

  const formatDateRange = (startDate: string, endDate?: string, isCurrentlyWorking?: boolean, isCurrent?: boolean) => {
    const start = new Date(startDate).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    const active = Boolean(isCurrentlyWorking || isCurrent);
    const end = active
      ? "Present"
      : endDate
        ? new Date(endDate).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "Present";

    return `${start} - ${end}`;
  };

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
              const isActiveRole = Boolean(exp.isCurrentlyWorking || exp.isCurrent);

              return (
                <ScrollReveal key={exp._id} delay={index * 100}>
                  <div className="border-l-2 border-primary/30 pl-6 py-4 hover:border-primary transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="flex-shrink-0">
                          {exp.companyLogo ? (
                            exp.companyWebsite ? (
                              <a
                                href={exp.companyWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                                aria-label={`${exp.company} website`}
                              >
                                <img
                                  src={exp.companyLogo}
                                  alt={exp.company}
                                  className="w-14 h-14 rounded-2xl object-cover border border-border/60 bg-card"
                                />
                              </a>
                            ) : (
                              <img
                                src={exp.companyLogo}
                                alt={exp.company}
                                className="w-14 h-14 rounded-2xl object-cover border border-border/60 bg-card"
                              />
                            )
                          ) : (
                            <div className="w-14 h-14 rounded-2xl border border-border/60 bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                              {exp.company.charAt(0)}
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xl font-bold text-foreground">{exp.position}</h4>
                          <p className="text-primary font-medium mb-1">{exp.company}</p>
                          <span className="text-mono text-sm text-muted-foreground">
                            {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentlyWorking, exp.isCurrent)}
                          </span>
                        </div>
                      </div>

                      <span className="text-mono text-sm text-muted-foreground">
                        {isActiveRole ? "Present" : exp.endDate ? "Completed" : "Present"}
                      </span>
                    </div>
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
