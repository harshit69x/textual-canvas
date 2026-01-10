import { GlitchText } from "../GlitchText";
import { MagneticButton } from "../MagneticButton";
import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/usePortfolioData";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { data: profile, isLoading } = useProfile();

  useEffect(() => {
    setMounted(true);
  }, []);

  const title = profile?.title || "Creative Developer";
  const tagline = profile?.tagline || "I design and build exceptional digital experiences. Currently focused on building accessible, human-centered products.";
  const name = profile?.name || "Developer";
  const isAvailable = profile?.isAvailable ?? true;

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden noise-overlay">
      {/* Floating accent elements */}
      <div className="absolute top-20 right-10 w-2 h-2 bg-primary rounded-full animate-float animate-pulse-glow" />
      <div className="absolute bottom-40 left-20 w-1 h-1 bg-primary rounded-full animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-primary/50 rounded-full animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 max-w-6xl">
        <div
          className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <p className="text-mono text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase">
              <span className="text-primary">//</span> {isLoading ? "Loading..." : title}
            </p>
            {isAvailable && (
              <span className="text-mono text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full animate-pulse">
                Available for work
              </span>
            )}
          </div>
        </div>

        <h1
          className={`text-display text-5xl md:text-7xl lg:text-9xl font-extrabold leading-[0.9] tracking-tight mb-8 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <GlitchText text="HARSHIT" />
          <br />
          <span className="gradient-text">MOHANTY</span>
          <br />
          <GlitchText text="DEVELOPER" />
        </h1>

        <div
          className={`max-w-xl transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-4">
            {tagline}
          </p>
          {profile?.shortBio && (
            <p className="text-muted-foreground/70 text-base leading-relaxed mb-10">
              {profile.shortBio}
            </p>
          )}
          {!profile?.shortBio && <div className="mb-10" />}

          <div className="flex flex-wrap gap-4">
            <a href="#work">
              <MagneticButton>
                View Work
              </MagneticButton>
            </a>
            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mono text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 px-4 py-2 border border-border rounded hover:border-primary"
              >
                Download Resume →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-12 left-6 md:left-12 lg:left-24 flex items-center gap-4 transition-all duration-1000 delay-700 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
        <span className="text-mono text-xs text-muted-foreground tracking-widest uppercase rotate-90 origin-left translate-x-2">
          Scroll
        </span>
      </div>
    </section>
  );
};
