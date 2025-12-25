import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
}

export const Marquee = ({ children, reverse = false, className }: MarqueeProps) => {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className={cn(
          "inline-flex",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
};
