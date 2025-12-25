import { ScrollReveal } from "../ScrollReveal";
import { MagneticButton } from "../MagneticButton";
import { GlitchText } from "../GlitchText";
import { useProfile } from "@/hooks/usePortfolioData";

export const Contact = () => {
  const { data: profile } = useProfile();

  const email = profile?.email || "hello@developer.com";
  const socialLinks = profile?.socialLinks || [
    { platform: "GitHub", url: "#" },
    { platform: "LinkedIn", url: "#" },
    { platform: "Twitter", url: "#" },
  ];

  // Capitalize platform names for display
  const formatPlatformName = (platform: string) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24" id="contact">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
            // Get In Touch
          </p>
          <h2 className="text-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
            Let's work
            <br />
            <span className="gradient-text">
              <GlitchText text="together" />
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-muted-foreground text-xl max-w-xl mb-12 leading-relaxed">
            Have a project in mind? I'd love to hear about it. Let's create 
            something extraordinary together.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <a href={`mailto:${email}`}>
              <MagneticButton>
                Say Hello
              </MagneticButton>
            </a>

            <div className="flex flex-col gap-2">
              <span className="text-mono text-xs text-muted-foreground tracking-widest uppercase">
                Email
              </span>
              <a
                href={`mailto:${email}`}
                className="text-foreground text-lg hover:text-primary transition-colors"
              >
                {email}
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal delay={400}>
          <div className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex gap-8">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mono text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide"
                >
                  {formatPlatformName(link.platform)}
                </a>
              ))}
            </div>

            <p className="text-mono text-sm text-muted-foreground">
              © {new Date().getFullYear()} <span className="text-primary">◆</span> All rights reserved
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
