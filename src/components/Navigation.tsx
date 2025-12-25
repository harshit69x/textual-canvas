import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["about", "work", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-6 transition-all duration-300",
        scrolled && "bg-background/80 backdrop-blur-md border-b border-border"
      )}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a
          href="#"
          className="text-display text-xl font-bold tracking-tight hover:text-primary transition-colors"
        >
          DEV<span className="text-primary">.</span>
        </a>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-mono text-sm tracking-widest uppercase transition-colors relative",
                activeSection === link.href.slice(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.name}
              {activeSection === link.href.slice(1) && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
