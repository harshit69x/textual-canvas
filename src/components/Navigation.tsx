import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useProfile } from "@/hooks/usePortfolioData";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: profile } = useProfile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["about", "skills", "work", "blog", "contact"];
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

  // Get first name or default
  const displayName = profile?.name?.split(" ")[0] || "DEV";

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
          {displayName.toUpperCase()}<span className="text-primary">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block text-mono text-sm tracking-widest uppercase transition-colors",
                  activeSection === link.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
