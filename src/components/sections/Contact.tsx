import { ScrollReveal } from "../ScrollReveal";
import { MagneticButton } from "../MagneticButton";
import { GlitchText } from "../GlitchText";

const socialLinks = [
  { name: "GitHub", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Dribbble", href: "#" },
];

export const Contact = () => {
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
            <MagneticButton>
              Say Hello
            </MagneticButton>

            <div className="flex flex-col gap-2">
              <span className="text-mono text-xs text-muted-foreground tracking-widest uppercase">
                Email
              </span>
              <a
                href="mailto:hello@developer.com"
                className="text-foreground text-lg hover:text-primary transition-colors"
              >
                hello@developer.com
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
                  key={link.name}
                  href={link.href}
                  className="text-mono text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <p className="text-mono text-sm text-muted-foreground">
              © 2024 <span className="text-primary">◆</span> All rights reserved
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
