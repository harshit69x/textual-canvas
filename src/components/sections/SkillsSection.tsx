import { ScrollReveal } from "../ScrollReveal";
import { useSkillsByCategory } from "@/hooks/usePortfolioData";

export const SkillsSection = () => {
  const { data: groupedSkills, isLoading } = useSkillsByCategory();

  if (isLoading) {
    return (
      <section className="py-32 px-6 md:px-12 lg:px-24" id="skills">
        <div className="max-w-6xl mx-auto">
          <p className="text-muted-foreground">Loading skills...</p>
        </div>
      </section>
    );
  }

  const categories = Object.keys(groupedSkills);

  if (categories.length === 0) {
    return null;
  }

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "advanced":
        return "bg-green-500/20 text-green-400";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400";
      case "beginner":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-primary/20 text-primary";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "expert":
        return "⭐";
      case "using":
        return "🔥";
      case "learning":
        return "📚";
      default:
        return "•";
    }
  };

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24" id="skills">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
            // Skills & Tools
          </p>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((category, categoryIndex) => (
            <ScrollReveal key={category} delay={categoryIndex * 100}>
              <div className="space-y-4">
                <h3 className="text-mono text-sm text-primary tracking-[0.2em] uppercase border-b border-border pb-2">
                  {category}
                </h3>
                <div className="space-y-3">
                  {groupedSkills[category].map((skill) => (
                    <div
                      key={skill._id}
                      className="group flex items-center justify-between p-3 rounded-lg hover:bg-card transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {skill.icon && (
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-6 h-6 object-contain"
                          />
                        )}
                        <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs">{getStatusIcon(skill.status)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {skill.yearsOfExperience && (
                          <span className="text-mono text-xs text-muted-foreground">
                            {skill.yearsOfExperience}y
                          </span>
                        )}
                        <span
                          className={`text-mono text-xs px-2 py-0.5 rounded ${getLevelColor(
                            skill.level
                          )}`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
