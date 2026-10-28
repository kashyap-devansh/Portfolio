import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Arrow, ease } from "./motion.jsx";

/*
  Project tile: image parallaxes inside its frame while scrolling, tilts
  toward the pointer, and the project's own hue draws a bar across the top.
*/
export default function ProjectCard({ project, index, large = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

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
  };

  return (
    <motion.article
      ref={ref}
      className={`pcard ${large ? "pcard--large" : ""}`}
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
        data-cursor="View"
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        <span className="pcard__bar" />
        <motion.div className="pcard__frame" style={{ rotateX: srx, rotateY: sry }}>
          <motion.img
            src={project.image}
            alt={`${project.title} — ${project.kind}`}
            loading="lazy"
            decoding="async"
            style={{ y: imgY }}
          />
          <div className="pcard__tags">
            {project.tags.map((t) => (
              <span key={t} className="pcard__tag hud-label">
                {t}
              </span>
            ))}
          </div>
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
    </motion.article>
  );
}
