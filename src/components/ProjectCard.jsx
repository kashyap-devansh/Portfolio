import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Arrow, ease } from "./motion.jsx";
import Cover from "./previews/Cover.jsx";
import Recording from "./previews/Recording.jsx";
import "./previews/previews.css";

/* True on devices with a real hover (mouse / trackpad). */
function useCanHover() {
  const [can, setCan] = useState(() => window.matchMedia("(hover: hover)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const sync = () => setCan(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return can;
}

/*
  Project tile: a coded cover that parallaxes while scrolling and tilts
  toward the pointer. Hovering plays a screen recording of the program;
  on touch screens it plays while the card is in view instead.
*/
export default function ProjectCard({ project, index, large = false }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const canHover = useCanHover();
  const inView = useInView(ref, { amount: 0.65 });
  const playing = canHover ? hovered : inView;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 6);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  };

  return (
    <motion.article
      ref={ref}
      className={`pcard ${large ? "pcard--large" : ""} ${playing ? "is-playing" : ""}`}
      style={{ "--hue": project.hue }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease, delay: (index % 2) * 0.12 }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="pcard__link"
        aria-label={`${project.title} — ${project.kind} (opens GitHub)`}
        data-cursor="View"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerMove={onMove}
        onPointerLeave={reset}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <span className="pcard__bar" />
        <motion.div className="pcard__frame" style={{ rotateX: srx, rotateY: sry }}>
          <Cover project={project} index={index} artY={artY} />
          <Recording project={project} playing={playing} />
        </motion.div>

        <div className="pcard__meta">
          <span className="hud-label pcard__num">{String(index + 1).padStart(2, "0")}</span>
          <div className="pcard__text">
            <h3 className="pcard__title">
              {project.title} <span className="serif muted">— {project.kind}</span>
            </h3>
            <p className="pcard__summary muted">{project.summary}</p>
          </div>
          <span className="pcard__go" aria-hidden="true">
            <Arrow />
          </span>
        </div>
      </a>
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer" className="pcard__live hud-label">
          <span className="pulse-dot" /> Live demo ↗
        </a>
      )}
    </motion.article>
  );
}
