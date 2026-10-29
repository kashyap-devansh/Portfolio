import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

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
  Marquee,
  Reveal,
  ScrollWords,
  SectionHead,
  SplitWords,
  ease,
} from "../../components/motion.jsx";
import { onBeat } from "../../components/music.js";
import ProjectCard from "../../components/ProjectCard.jsx";
import MoreCard from "../../components/MoreCard.jsx";
import portrait from "../../assets/img/portrait.webp";
import cutout from "../../assets/img/cutout.webp";
import "./Home.css";

/* ------------------------------------------------------------------ Hero */

// Faint dashes radiating from the centre, generated once and drawn as one static SVG.
const dashes = Array.from({ length: 150 }, (_, i) => {
  const a = i * 2.39996 + (i % 7) * 0.13;
  const r = 140 + ((i * 97) % 820);
  const len = 6 + ((i * 31) % 14);
  const x = 1000 + Math.cos(a) * r;
  const y = 600 + Math.sin(a) * r;
  return `M${x.toFixed(1)} ${y.toFixed(1)}L${(x + Math.cos(a) * len).toFixed(1)} ${(y + Math.sin(a) * len).toFixed(1)}`;
}).join("");

// Tool logos split across two orbits; each sits at an angle and depth of its own.
const orbits = [
  { cls: "hero__orbit--inner", items: tools.slice(0, 5) },
  { cls: "hero__orbit--outer", items: tools.slice(5) },
];

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" />
      <rect x="9" y="2" width="5" height="5" />
      <rect x="2" y="9" width="5" height="5" />
      <rect x="9" y="9" width="5" height="5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
    </svg>
  );
}

function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // The Λ and the orbiting logos pulse on the music's kick drum. Only this
  // section's --beat changes, so the restyle stays local to the hero.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let shown = -1;
    return onBeat((pulse) => {
      const v = Math.round(pulse * 50) / 50;
      if (v !== shown) ref.current?.style.setProperty("--beat", (shown = v));
    });
  }, []);

  const reveal = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease, delay },
  });

  return (
    <section ref={ref} className={`hero${ready ? " is-ready" : ""}`}>
      <div className="hero__bg" aria-hidden="true">
        <svg className="hero__dashes" viewBox="0 0 2000 1200" preserveAspectRatio="xMidYMid slice">
          <path d={dashes} />
        </svg>
        <div className="hero__ring hero__ring--a" />
        <div className="hero__ring hero__ring--b" />
        <div className="hero__ring hero__ring--c" />
        {orbits.map((o) => (
          <div key={o.cls} className={`hero__orbit ${o.cls}`}>
            {o.items.map((t, i) => (
              <span
                key={t.name}
                className="hero__sat"
                style={{ "--p": i / o.items.length + (o.cls.endsWith("outer") ? 0.06 : 0), "--d": i % 3 }}
              >
                <span className="hero__tile">
                  <img src={t.icon} alt="" />
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <motion.div className="hero__inner" style={{ y: contentY, opacity: fade }}>
        <div className="hero__halo" aria-hidden="true" />

        <div className="hero__mark" role="img" aria-label={profile.name}>
          {["D", "E", "V", "Λ", "N", "S", "H"].map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="hero__letter"
              initial={{ opacity: 0, y: "30%" }}
              animate={ready ? { opacity: 1, y: "0%" } : {}}
              transition={{ duration: 1, ease, delay: 0.1 + i * 0.06 }}
            >
              {ch === "Λ" ? (
                <svg viewBox="0 0 116 100" className="hero__lambda">
                  <path d="M0 100 42 0h32l42 100H86L58 31 30 100Z" />
                </svg>
              ) : (
                ch
              )}
            </motion.span>
          ))}
        </div>

        <motion.h1 className="hero__title" {...reveal(0.55)}>
          I build software <span className="serif">from the ground up.</span>
        </motion.h1>

        <motion.p className="hero__lede" {...reveal(0.65)}>
          I&apos;m Devansh Kashyap, a 19-year-old developer writing interpreters, database engines and
          terminal tools from scratch in C and C++.
        </motion.p>

        <motion.div className="hero__ctas" {...reveal(0.75)}>
          <span className="hero__cta-stack">
            <a href="#work" className="btn btn--solid">
              <Arrow /> View my work
            </a>
            <span className="hud-label faint">C · C++ · JavaScript</span>
          </span>
          <a href="#contact" className="btn btn--line">
            <GridIcon /> Get in touch
          </a>
        </motion.div>

        <motion.p className="hero__resume" {...reveal(0.85)}>
          Looking for my résumé? <Link to="/resume">Read it here</Link> or{" "}
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            download the PDF
          </a>
          .
        </motion.p>

        <motion.div className="hero__facts" {...reveal(0.95)}>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hud-label">
            <GitHubIcon /> Open source on GitHub
          </a>
          <span className="hud-label">C · C++ · Linux</span>
          <span className="hud-label">Open to internships</span>
        </motion.div>
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
  // Watch the unclipped wrapper, not the figure: Chromium's IntersectionObserver
  // honours the figure's own clip-path, so a fully clipped figure never "enters".
  const sideRef = useRef(null);
  const photoIn = useInView(sideRef, { once: true, amount: 0.3 });

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

          <div ref={sideRef} className="about-teaser__side">
            <motion.figure
              className="about-teaser__photo"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={photoIn ? { clipPath: "inset(0% 0 0 0)" } : undefined}
              transition={{ duration: 1.4, ease }}
            >
              <motion.img src={portrait} alt="Portrait of Devansh Kashyap" style={{ y: photoY }} />
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
