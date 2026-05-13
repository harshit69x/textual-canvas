import { useEffect, useRef } from "react";

export const LandingEffects = () => {
  const curRef = useRef<HTMLDivElement | null>(null);
  const cur2Ref = useRef<HTMLDivElement | null>(null);
  const progRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cur = curRef.current;
    const cur2 = cur2Ref.current;
    const prog = progRef.current;
    if (!cur || !cur2 || !prog) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + "px";
      cur.style.top = my + "px";
    };

    const loop = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      cur2.style.left = rx + "px";
      cur2.style.top = ry + "px";
      rafId = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      if (h <= 0) return (prog.style.width = "0%");
      prog.style.width = (window.scrollY / h) * 100 + "%";
    };

    const onEnter = () => {
      cur.style.transform = "translate(-50%,-50%) scale(2.5)";
      cur2.style.width = "48px";
      cur2.style.height = "48px";
    };
    const onLeave = () => {
      cur.style.transform = "translate(-50%,-50%) scale(1)";
      cur2.style.width = "28px";
      cur2.style.height = "28px";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("scroll", onScroll, { passive: true });
    loop();

    const hoverables = document.querySelectorAll("a,button,.proj-row,.tl-item,.c-link");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={curRef}
        id="cur"
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-secondary w-1.5 h-1.5"
        style={{ transition: "transform .1s, background .2s" }}
      />

      <div
        ref={cur2Ref}
        id="cur2"
        className="pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 w-7 h-7"
        style={{ transition: "left .07s,top .07s, width .12s, height .12s", willChange: "left,top" }}
      />

      <div id="prog" ref={progRef} className="fixed top-0 left-0 h-0.5 bg-primary z-[900] w-0 transition-width duration-75" />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(#0000_1px,#0000_1px)]" aria-hidden />

      <div className="orb o1 pointer-events-none fixed -left-20 -top-14 w-[28rem] h-[28rem] rounded-full blur-3xl bg-gradient-to-br from-purple-700/20" aria-hidden />
      <div className="orb o2 pointer-events-none fixed -right-10 bottom-8 w-[20rem] h-[20rem] rounded-full blur-3xl bg-green-700/10" aria-hidden />
    </>
  );
};

export default LandingEffects;
