import { ScrollReveal } from "../ScrollReveal";
import { useState } from "react";
import { useProjects } from "@/hooks/usePortfolioData";

export const Work = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const { data: projects = [], isLoading } = useProjects();

  // Format projects for display
  const formattedProjects = projects.slice(0, 8).map((project, index) => ({
    id: String(index + 1).padStart(2, "0"),
    _id: project._id,
    title: project.title || project.name || "Untitled Project",
    category: project.category || project.type === "github" ? "GitHub Repository" : "Project",
    year: project.lastUpdated ? new Date(project.lastUpdated).getFullYear().toString() : "2024",
    description: project.description || "A creative project showcasing modern development techniques.",
    techStack: project.techStack || project.customTechnologies || [],
    githubUrl: project.githubUrl,
    homepageUrl: project.homepageUrl,
    stars: project.stars,
  }));

  // Fallback projects if API returns empty
  const displayProjects = formattedProjects.length > 0 ? formattedProjects : [
    {
      id: "01",
      _id: "1",
      title: "E-Commerce Platform",
      category: "Full Stack Development",
      year: "2024",
      description: "A modern e-commerce solution with real-time inventory and seamless checkout.",
      techStack: [],
      githubUrl: undefined,
      homepageUrl: undefined,
      stars: undefined,
    },
    {
      id: "02",
      _id: "2",
      title: "SaaS Dashboard",
      category: "UI/UX + Frontend",
      year: "2024",
      description: "Analytics dashboard with complex data visualization and user management.",
      techStack: [],
      githubUrl: undefined,
      homepageUrl: undefined,
      stars: undefined,
    },
  ];

  if (isLoading) {
    return (
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-card" id="work">
        <div className="max-w-6xl mx-auto">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-card" id="work">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
            // Selected Work
          </p>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {displayProjects.map((project, index) => (
            <ScrollReveal key={project._id} delay={index * 100}>
              <a
                href={project.homepageUrl || project.githubUrl || "#"}
                target={project.homepageUrl || project.githubUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group border-t border-border py-8 md:py-12 cursor-pointer transition-all duration-300 block"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-6 md:gap-12">
                    <span
                      className={`text-mono text-sm transition-colors duration-300 ${
                        hoveredProject === project.id ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {project.id}
                    </span>
                    <h3
                      className={`text-display text-2xl md:text-4xl font-bold transition-all duration-300 ${
                        hoveredProject === project.id
                          ? "text-primary translate-x-4"
                          : "text-foreground"
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-8 md:gap-16 ml-12 md:ml-0">
                    <span className="text-mono text-sm text-muted-foreground hidden md:block">
                      {project.category}
                    </span>
                    {project.stars !== undefined && project.stars > 0 && (
                      <span className="text-mono text-sm text-muted-foreground hidden md:flex items-center gap-1">
                        ⭐ {project.stars}
                      </span>
                    )}
                    <span className="text-mono text-sm text-muted-foreground">
                      {project.year}
                    </span>
                    <span
                      className={`text-2xl transition-all duration-300 ${
                        hoveredProject === project.id
                          ? "text-primary translate-x-2"
                          : "text-muted-foreground"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </div>

                <p
                  className={`text-muted-foreground mt-4 ml-12 md:ml-24 max-w-xl overflow-hidden transition-all duration-300 ${
                    hoveredProject === project.id
                      ? "max-h-20 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {project.description}
                </p>

                {project.techStack && project.techStack.length > 0 && (
                  <div
                    className={`flex flex-wrap gap-2 mt-3 ml-12 md:ml-24 overflow-hidden transition-all duration-300 ${
                      hoveredProject === project.id
                        ? "max-h-20 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {project.techStack.slice(0, 5).map((tech, i) => (
                      <span
                        key={i}
                        className="text-mono text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
