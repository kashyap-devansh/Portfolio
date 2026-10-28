import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import {
  capabilities,
  principles,
  profile,
  projects,
  stack,
  tools,
} from "../../data/site.js";
import {
  Arrow,
  Counter,
  Magnetic,
  Marquee,
  Reveal,
  ScrollWords,
  SectionHead,
  SplitWords,
  ease,
} from "../../components/motion.jsx";
import ProjectCard from "../../components/ProjectCard.jsx";
import MoreCard from "../../components/MoreCard.jsx";
import Terminal from "./Terminal.jsx";
import portrait from "../../assets/img/portrait.webp";
import cutout from "../../assets/img/cutout.webp";
import "./Home.css";

/* ------------------------------------------------------------------ Hero */

function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Glow follows the pointer through CSS variables — no re-renders.
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const fadeIn = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, ease, delay },
  });

  return (
    <section ref={ref} className="hero" onPointerMove={onMove}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <div className="hero__glow hero__glow--pointer" />
      </div>

      <motion.div className="container hero__inner" style={{ opacity: fade }}>
        <motion.div className="hero__meta hud-label" {...fadeIn(0.1)}>
          <span>
            <span className="accent">[00]</span> Portfolio — 2026
          </span>
          <span className="hero__status">
            <span className="pulse-dot" /> Open to internships &amp; collaborations
          </span>
        </motion.div>

        <motion.div style={{ y: titleY }}>
          <SplitWords
            as="h1"
            play={ready}
            delay={0.15}
            stagger={0.07}
            className="display display-xl hero__title"
            parts={[["I build software"], ["from the"], ["ground up.", "serif accent"]]}
          />
        </motion.div>

        <div className="hero__lower">
          <div className="hero__copy">
            <motion.p className="lede" {...fadeIn(0.8)}>
              I'm <strong className="hero__name">Devansh Kashyap</strong>, a 19-year-old developer writing
              interpreters, database engines and terminal tools from scratch in C and C++.
            </motion.p>
            <motion.div className="hero__ctas" {...fadeIn(0.95)}>
              <Magnetic>
                <a href="#work" className="btn btn--solid">
                  Selected work <Arrow />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn btn--line">
                  Get in touch
                </a>
              </Magnetic>
            </motion.div>
            <motion.p className="hud-label faint hero__platforms" {...fadeIn(1.1)}>
              Open source · C / C++ · Linux
            </motion.p>
          </div>

          <motion.div
            className="hero__term"
            initial={{ opacity: 0, y: 40, rotateX: 18 }}
            animate={ready ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 1.3, ease, delay: 0.7 }}
          >
            <Terminal />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="hero__scroll hud-label faint"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
      >
        <span className="hero__scroll-line" /> Scroll
      </motion.div>
    </section>
  );
}

/* --------------------------------------------------------------- Ticker */

const tickerWords = ["Interpreters", "Databases", "Terminal Tools", "Compilers", "Systems", "Open Source"];

function Ticker() {
  return (
    <Marquee duration={36} className="ticker">
      {tickerWords.map((w, i) => (
        <span key={w} className="ticker__item">
          <span className={i % 2 ? "serif" : ""}>{w}</span>
          <span className="ticker__star">✦</span>
        </span>
      ))}
    </Marquee>
  );
}

/* ----------------------------------------------------------------- Work */

function Work() {
  const featured = projects.filter((p) => p.featured);
  const count = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"][featured.length] ?? featured.length;
  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHead
          num="01"
          label="Selected work"
          title={[[`${count} builds,`], ["zero shortcuts.", "serif"]]}
          aside={
            <Link to="/projects" className="btn btn--line">
              All projects ({String(projects.length).padStart(2, "0")}) <Arrow />
            </Link>
          }
        />
      </div>
      <div className="container container--flush">
        <div className="hairline-grid work__grid">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
          {featured.length % 2 === 1 && <MoreCard to="/projects" />}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- About */

function AboutTeaser() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="section about-teaser">
      <div className="container">
        <div className="section-head__index hud-label about-teaser__label">
          <span>
            <span className="section-head__num">02</span>
            <span className="faint">/</span>
            <span className="muted">Introduction</span>
          </span>
        </div>

        <div className="about-teaser__grid">
          <ScrollWords
            className="about-teaser__text display"
            highlight={["scratch", "foundations", "behind"]}
            text="I'm passionate about building software from scratch. From an interpreted programming language to a SQL-like database engine, I enjoy turning ideas into working systems. My goal is to master the foundations of software engineering and build technology that is efficient, reliable and crafted with a deep understanding of how it works behind the scenes."
          />

          <div className="about-teaser__side">
            <motion.figure
              className="about-teaser__photo"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease }}
            >
              <motion.img src={portrait} alt="Portrait of Devansh Kashyap" loading="lazy" style={{ y: photoY }} />
              <figcaption className="hud-label">
                <span>Devansh Kashyap</span>
                <span>IN</span>
              </figcaption>
            </motion.figure>
            <Link to="/about" className="btn btn--line about-teaser__more">
              More about me <Arrow />
            </Link>
          </div>
        </div>

        <div className="hairline-grid stats">
          {[
            { n: projects.length, label: "Projects built from scratch" },
            { n: 3, label: "Languages I work in daily" },
            { n: tools.length, label: "Tools in the kit" },
            { n: 0, label: "Third-party libraries in Ark", pad: 1 },
          ].map((s, i) => (
            <Reveal key={s.label} className="stat" delay={i * 0.08}>
              <span className="stat__num">
                <Counter to={s.n} pad={s.pad ?? 2} />
              </span>
              <span className="hud-label muted">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Capabilities */

function Capabilities() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          num="03"
          label="Capabilities"
          title={[["What I"], ["can do.", "serif"]]}
          aside={<p className="lede">The layers most people import, built and understood by hand.</p>}
        />
        <div className="hairline-grid caps">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} className="cap invert-block" delay={(i % 3) * 0.08}>
              <span className="hud-label faint">0{i + 1}</span>
              <h3 className="cap__title">{c.title}</h3>
              <p className="cap__body muted">{c.body}</p>
            </Reveal>
          ))}
          <Reveal className="cap cap--locked" delay={0.16}>
            <span className="hud-label">06 · Locked</span>
            <svg viewBox="0 0 24 24" className="cap__lock" aria-hidden="true">
              <rect x="4.5" y="10.5" width="15" height="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            <h3 className="cap__title">Hire to unlock other abilities.</h3>
            <a href="#contact" className="link-u hud-label">
              Unlock <Arrow />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Stack */

function Stack() {
  return (
    <section className="section stack">
      <div className="container">
        <SectionHead num="04" label="Technologies" title={[["Build. Create."], ["Optimize.", "serif"], ["Deploy."]]} />
        <div className="hairline-grid stack__grid">
          {stack.map((g, gi) => (
            <div key={g.group} className="stack__col">
              <span className="hud-label faint">
                <span className="accent">0{gi + 1}</span> {g.group}
              </span>
              {/* The list is the in-view trigger: the masked spans themselves are clipped and never intersect. */}
              <motion.ul initial="hide" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
                {g.items.map((it, i) => (
                  <li key={it} className="mask">
                    <motion.span
                      variants={{
                        hide: { y: "105%" },
                        show: { y: "0%", transition: { duration: 1, ease, delay: gi * 0.08 + i * 0.06 } },
                      }}
                    >
                      {it}
                    </motion.span>
                  </li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>

      <Marquee duration={50} reverse className="tools-marquee">
        {tools.map((t) => (
          <span key={t.name} className="tool-pill">
            <span className="tool-chip">
              <img src={t.icon} alt="" loading="lazy" />
            </span>
            {t.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ----------------------------------------------------------- Principles */

function Principles() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead num="05" label="Ethos" title={[["Understand it."], ["Then build it.", "serif"]]} />
        <div className="hairline-grid principles">
          {principles.map((p, i) => (
            <Reveal key={p.key} className="principle" delay={i * 0.1}>
              <span className="principle__key">{p.key}</span>
              <h3 className="principle__title">{p.title}</h3>
              <p className="muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Contact */

function Contact() {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const figureY = useTransform(scrollYProgress, [0, 1], ["14%", "0%"]);
  const figureRotate = useTransform(scrollYProgress, [0, 1], [-6, 0]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" ref={ref} className="section contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <div className="section-head__index hud-label">
          <span>
            <span className="section-head__num">06</span>
            <span className="faint">/</span>
            <span className="muted">Contact</span>
          </span>
        </div>

        <div className="contact__hero">
          <SplitWords
            as="h2"
            className="display contact__title"
            stagger={0.08}
            parts={[["Let's work"], ["together.", "serif accent"]]}
          />
          <motion.img
            src={cutout}
            alt="Devansh sitting"
            className="contact__figure"
            loading="lazy"
            style={{ y: figureY, rotate: figureRotate }}
          />
        </div>

        <Reveal className="lede contact__lede">
          I'm always open to new projects, meaningful collaborations and technical discussions. Have an
          opportunity in mind, or just want to talk about programming? I'd love to hear from you.
        </Reveal>

        <div className="hairline-grid contact__cards">
          <Reveal className="contact__card">
            <span className="hud-label faint">Email</span>
            <p className="contact__value">{profile.email}</p>
            <div className="contact__actions">
              <a href={`mailto:${profile.email}`} className="btn btn--solid">
                Write to me <Arrow />
              </a>
              <button onClick={copy} className="btn btn--line" aria-live="polite">
                {copied ? "Copied ✓" : "Copy address"}
              </button>
            </div>
          </Reveal>
          <Reveal className="contact__card" delay={0.1}>
            <span className="hud-label faint">Code</span>
            <p className="contact__value">github.com/kashyap-devansh</p>
            <div className="contact__actions">
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn--line">
                Open GitHub <Arrow />
              </a>
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn--line">
                  LinkedIn <Arrow />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Home({ ready }) {
  return (
    <>
      <Hero ready={ready} />
      <Ticker />
      <Work />
      <AboutTeaser />
      <Capabilities />
      <Stack />
      <Principles />
      <Contact />
    </>
  );
}
