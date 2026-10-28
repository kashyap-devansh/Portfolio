import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from "framer-motion";
import { projects } from "../../data/site.js";
import ProjectCard from "../../components/ProjectCard.jsx";
import { Arrow, SplitWords, ease } from "../../components/motion.jsx";
import "./Projects.css";

const filters = ["All", ...new Set(projects.map((p) => p.category))];

function ListView({ items }) {
  const [hovered, setHovered] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 26 });
  const sy = useSpring(y, { stiffness: 260, damping: 26 });

  return (
    <div
      className="plist"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      {items.map((p, i) => (
        <motion.a
          layout
          key={p.id}
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className="plist__row"
          style={{ "--hue": p.hue }}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(p)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease, delay: i * 0.04 }}
        >
          <span className="hud-label faint">{String(i + 1).padStart(2, "0")}</span>
          <span className="plist__title">{p.title}</span>
          <span className="plist__kind serif muted">{p.kind}</span>
          <span className="hud-label muted plist__lang">{p.lang}</span>
          <span className="hud-label muted plist__year">{p.year}</span>
          <span className="plist__go">
            <Arrow />
          </span>
        </motion.a>
      ))}

      <motion.div className="plist__preview" style={{ x: sx, y: sy }} aria-hidden="true">
        <AnimatePresence>
          {hovered && (
            <motion.img
              key={hovered.id}
              src={hovered.image}
              alt=""
              initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 0 50% 0)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("grid");
  const items = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="projects-page">
      <header className="container projects-hero">
        <motion.p
          className="hud-label muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="accent">[{String(projects.length).padStart(2, "0")}]</span> Index of work
        </motion.p>
        <SplitWords
          as="h1"
          play
          delay={0.2}
          className="display projects-hero__title"
          parts={[["All"], ["projects.", "serif accent"]]}
        />
        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.6 }}
        >
          Everything here was written from an empty file — interpreters, storage engines, editors and games.
          Each one is open source on GitHub.
        </motion.p>
      </header>

      <div className="projects-bar">
        <div className="container projects-bar__inner">
          <LayoutGroup id="filters">
            <div className="chips" role="tablist" aria-label="Filter projects">
              {filters.map((f) => {
                const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
                return (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={filter === f}
                    className={`chip hud-label ${filter === f ? "is-active" : ""}`}
                    onClick={() => setFilter(f)}
                  >
                    {filter === f && <motion.span layoutId="chip-bg" className="chip__bg" />}
                    <span className="chip__text">
                      {f} <span className="chip__count">{count}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="view-toggle" role="group" aria-label="View">
            {["grid", "list"].map((v) => (
              <button
                key={v}
                className={`chip hud-label ${view === v ? "is-active" : ""}`}
                aria-pressed={view === v}
                onClick={() => setView(v)}
              >
                {view === v && <motion.span layoutId="view-bg" className="chip__bg" />}
                <span className="chip__text">{v}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container container--flush projects-body">
        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div
              key={`grid-${filter}`}
              className="hairline-grid work__grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {items.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`list-${filter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ListView items={items} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
