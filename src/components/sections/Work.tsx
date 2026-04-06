import { ScrollReveal } from "../ScrollReveal";
import { useProjects } from "@/hooks/usePortfolioData";

const truncateText = (value: string, maxLength = 220) => {
  if (!value) return value;
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
};

export const Work = () => {
  const { data: projects = [], isLoading } = useProjects();

  // Sort projects: pinned first, then featured, then by lastUpdated
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime();
  });

  // Format projects for display
  const formattedProjects = sortedProjects.slice(0, 10).map((project, index) => ({
    id: String(index + 1).padStart(2, "0"),
    _id: project._id,
    title: project.title || project.name || "Untitled Project",
    category: project.category || (project.type === "github" ? "GitHub Repository" : "Project"),
    year: project.lastUpdated ? new Date(project.lastUpdated).getFullYear().toString() : new Date().getFullYear().toString(),
    description: truncateText(
      project.description || "A creative project showcasing modern development techniques."
    ),
    techStack: [...(project.techStack || []), ...(project.customTechnologies || [])],
    githubUrl: project.githubUrl,
    homepageUrl: project.homepageUrl,
    stars: project.stars,
    forks: project.forks,
    language: project.language,
    isPinned: project.isPinned,
    isFeatured: project.isFeatured,
    type: project.type,
    coverImage: project.coverImage,
    status: project.status,
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
      techStack: ["React", "Node.js", "MongoDB"],
      githubUrl: undefined,
      homepageUrl: undefined,
      stars: undefined,
      forks: undefined,
      language: "TypeScript",
      isPinned: false,
      isFeatured: false,
      type: "manual" as const,
      coverImage: undefined,
      status: undefined,
    },
  ];

  // Get language color
  const getLanguageColor = (language?: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-400",
      Python: "bg-green-400",
      Java: "bg-orange-400",
      Go: "bg-cyan-400",
      Rust: "bg-orange-600",
      Ruby: "bg-red-400",
      PHP: "bg-purple-400",
      CSS: "bg-pink-400",
      HTML: "bg-orange-500",
    };
    return colors[language || ""] || "bg-gray-400";
  };

  if (isLoading) {
    return (
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-card" id="work">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-52 bg-muted rounded-2xl"></div>
            ))}
          </div>
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
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground mb-16 max-w-xl">
            A collection of projects I've worked on, from open-source contributions to full-stack applications.
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          {displayProjects.map((project, index) => (
            <ScrollReveal key={project._id} delay={index * 100}>
              <a
                href={project.homepageUrl || project.githubUrl || "#"}
                target={project.homepageUrl || project.githubUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group block"
              >
                <article className="rounded-2xl border border-border/70 bg-background/30 backdrop-blur-sm p-5 md:p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <div className="w-full lg:w-[260px] flex-shrink-0">
                      {project.coverImage ? (
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full aspect-video rounded-xl object-cover border border-border/60"
                        />
                      ) : (
                        <div className="w-full aspect-video rounded-xl border border-border/60 bg-gradient-to-br from-primary/20 via-background to-card flex items-end p-4">
                          <span className="text-mono text-sm text-primary">{project.id}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h3 className="text-display text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors break-words [overflow-wrap:anywhere]">
                          {project.title}
                        </h3>
                        {project.isPinned && (
                          <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">📌 Pinned</span>
                        )}
                        {project.isFeatured && !project.isPinned && (
                          <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">⭐ Featured</span>
                        )}
                      </div>

                      <p className="text-muted-foreground leading-relaxed max-w-2xl break-words [overflow-wrap:anywhere]">
                        {project.description}
                      </p>

                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.techStack.slice(0, 8).map((tech, i) => (
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

                    <div className="flex flex-row lg:flex-col lg:items-end justify-between gap-4 lg:gap-2 text-mono text-sm text-muted-foreground min-w-[160px]">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                      {project.language && (
                        <span className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(project.language)}`}></span>
                          {project.language}
                        </span>
                      )}
                      {project.stars !== undefined && project.stars > 0 && <span>⭐ {project.stars}</span>}
                      {project.forks !== undefined && project.forks > 0 && <span>🍴 {project.forks}</span>}
                      <span className="text-base text-primary group-hover:translate-x-1 transition-transform">View →</span>
                    </div>
                  </div>
                </article>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {projects.length > 10 && (
          <ScrollReveal delay={500}>
            <div className="text-center mt-12">
              <p className="text-muted-foreground text-sm">
                And {projects.length - 10} more projects...
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
