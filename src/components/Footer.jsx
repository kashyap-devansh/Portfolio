import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { profile, projects } from "../data/site.js";
import { useClock } from "./hooks.js";
import { ease } from "./motion.jsx";
import { scrollToTarget } from "./SmoothScroll.jsx";

const WORD = "DEVΛNSH";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const time = useClock(profile.timeZone);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__intro">
            <p className="display display-md">
              Building software <span className="serif">from scratch,</span> one file at a time.
            </p>
            <a href={`mailto:${profile.email}`} className="footer__mail link-u">
              {profile.email}
            </a>
          </div>

          <div className="footer__col">
            <span className="hud-label faint">Pages</span>
            <Link to="/" className="link-u">Index</Link>
            <Link to="/projects" className="link-u">All projects</Link>
            <Link to="/about" className="link-u">About me</Link>
            <Link to="/#contact" className="link-u">Contact</Link>
          </div>

          <div className="footer__col">
            <span className="hud-label faint">Projects</span>
            {/* Top four only — the full list lives on /projects. */}
            {projects
              .filter((p) => p.featured)
              .slice(0, 4)
              .map((p) => (
                <a key={p.id} href={p.link} target="_blank" rel="noreferrer" className="link-u">
                  {p.title}
                </a>
              ))}
            <Link to="/projects" className="link-u footer__all">
              All projects ({projects.length}) →
            </Link>
          </div>

          <div className="footer__col">
            <span className="hud-label faint">Elsewhere</span>
            <a href={profile.github} target="_blank" rel="noreferrer" className="link-u">GitHub ↗</a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-u">LinkedIn ↗</a>
            )}
            <a href={`mailto:${profile.email}`} className="link-u">Email ↗</a>
          </div>
        </div>
      </div>

      <div ref={ref} className="footer__wordmark" aria-hidden="true">
        {WORD.split("").map((ch, i) => (
          <span className="mask" key={i}>
            <motion.span
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 1.2, ease, delay: i * 0.06 }}
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </div>

      <div className="container footer__bar hud-label">
        <span>© 2026 {profile.name}</span>
        <span className="footer__time">
          <span className="faint">Local time</span> {time} IST
        </span>
        <button onClick={() => scrollToTarget(null)} className="link-u">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
