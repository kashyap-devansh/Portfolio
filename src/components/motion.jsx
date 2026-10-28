import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export const ease = [0.16, 1, 0.3, 1];

/* Fade + rise when scrolled into view. */
export function Reveal({ as = "div", delay = 0, y = 32, amount = 0.25, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/*
  Masked word-by-word reveal. `parts` is a list of [text, className] so a
  single headline can mix the display face with the serif italic.
  Pass `play` to drive it manually (e.g. after the loader); otherwise it
  plays when it scrolls into view.
*/
export function SplitWords({ parts, as = "h2", className, delay = 0, stagger = 0.06, play }) {
  const Tag = motion[as];
  const words = [];
  parts.forEach(([text, cls], p) => {
    text.split(" ").forEach((w, i, arr) => {
      if (!w) return;
      words.push({ w: i < arr.length - 1 ? `${w} ` : w, cls, key: `${p}-${i}` });
    });
    if (p < parts.length - 1 && !text.endsWith(" ")) words[words.length - 1].w += " ";
  });

  const state = play === undefined ? {} : { animate: play ? "show" : "hide" };
  const trigger =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, amount: 0.4 } }
      : {};

  return (
    <Tag
      className={className}
      initial="hide"
      {...state}
      {...trigger}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={parts.map((p) => p[0]).join(" ")}
    >
      {words.map(({ w, cls, key }) => (
        <span className="mask" key={key} style={{ display: "inline-block" }} aria-hidden="true">
          <motion.span
            className={`word ${cls || ""}`}
            variants={{
              hide: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* Paragraph whose words light up as you scroll through it. */
export function ScrollWords({ text, className, highlight = [] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const clean = w.replace(/[^\w]/g, "").toLowerCase();
        return (
          <ScrollWord
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            hot={highlight.includes(clean)}
          >
            {w}
          </ScrollWord>
        );
      })}
    </p>
  );
}

function ScrollWord({ children, progress, range, hot }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={hot ? "serif accent" : undefined}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/* Count up to `to` when visible. */
export function Counter({ to, pad = 2, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {String(val).padStart(pad, "0")}
      {suffix}
    </span>
  );
}

/* Element that leans toward the pointer. */
export function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

export function Marquee({ children, duration = 40, reverse = false, className = "" }) {
  return (
    <div className={`marquee ${reverse ? "marquee--reverse" : ""} ${className}`}>
      <div className="marquee__track" style={{ "--duration": `${duration}s` }}>
        <div style={{ display: "flex" }}>{children}</div>
        <div style={{ display: "flex" }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* "01/Selected work" header with a rule that draws itself in. */
export function SectionHead({ num, label, title, aside }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className={`section-head ${inView ? "is-in" : ""}`}>
      <div className="section-head__index hud-label">
        <span>
          <span className="section-head__num">{num}</span>
          <span className="faint">/</span>
          <span className="muted">{label}</span>
        </span>
      </div>
      <div className="section-head__row">
        <SplitWords as="h2" className="display display-lg" parts={title} />
        {aside && <Reveal delay={0.2}>{aside}</Reveal>}
      </div>
    </div>
  );
}

export function Arrow({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
