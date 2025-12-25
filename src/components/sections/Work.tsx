import { ScrollReveal } from "../ScrollReveal";
import { useState } from "react";

const projects = [
  {
    id: "01",
    title: "E-Commerce Platform",
    category: "Full Stack Development",
    year: "2024",
    description: "A modern e-commerce solution with real-time inventory and seamless checkout.",
  },
  {
    id: "02",
    title: "SaaS Dashboard",
    category: "UI/UX + Frontend",
    year: "2024",
    description: "Analytics dashboard with complex data visualization and user management.",
  },
  {
    id: "03",
    title: "Creative Agency",
    category: "Web Design",
    year: "2023",
    description: "Award-winning website for a boutique creative agency based in NYC.",
  },
  {
    id: "04",
    title: "Mobile Banking App",
    category: "Product Design",
    year: "2023",
    description: "Complete redesign of a mobile banking experience for Gen Z users.",
  },
];

export const Work = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

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
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
              <div
                className="group border-t border-border py-8 md:py-12 cursor-pointer transition-all duration-300"
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
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
