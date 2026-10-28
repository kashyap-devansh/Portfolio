import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  backstory,
  education,
  hobbies,
  journey,
  profile,
  skills,
  tools,
} from "../../data/site.js";
import {
  Arrow,
  Counter,
  Magnetic,
  Reveal,
  ScrollWords,
  SectionHead,
  SplitWords,
  ease,
} from "../../components/motion.jsx";
import portrait from "../../assets/img/portrait.webp";
import SelfLearningSeal from "./SelfLearningSeal.jsx";
import "./About.css";

const hellos = ["Hello", "नमस्ते", "Hola", "Bonjour", "こんにちは"];

function Greeting() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % hellos.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="greeting">
      <motion.span
        key={hellos[i]}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        {hellos[i]}
      </motion.span>
      <span className="faint">^_^</span>
    </span>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={ref} className="about-hero container">
      <div className="about-hero__text">
        <motion.p
          className="hud-label muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="accent">[A]</span> About — <Greeting />
        </motion.p>
        <SplitWords
          as="h1"
          play
          delay={0.15}
          className="display about-hero__title"
          parts={[["/bout"], ["Devansh.", "serif accent"]]}
        />
        <motion.div
          className="about-hero__ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.7 }}
        >
          <Magnetic>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn--solid">
              GitHub <Arrow />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={`mailto:${profile.email}`} className="btn btn--line">
              Email me
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.figure
        className="about-hero__photo"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.4, ease, delay: 0.3 }}
      >
        <motion.img src={portrait} alt="Portrait of Devansh Kashyap" style={{ scale: imgScale }} />
        <span className="about-hero__badge hud-label">
          <span className="pulse-dot" /> Currently building
        </span>
      </motion.figure>
    </section>
  );
}

function Bars({ data }) {
  return (
    <div className="bars">
      {data.map((s, i) => (
        <Bar key={s.label} {...s} delay={i * 0.1} />
      ))}
    </div>
  );
}

function Bar({ label, value, hot, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <div ref={ref} className={`bar ${hot ? "bar--hot" : ""}`}>
      <div className="bar__head">
        <span className="bar__label">{label}</span>
        <span className="hud-label muted">
          <Counter to={value} pad={2} suffix="%" />
        </span>
      </div>
      <div className="bar__track">
        <motion.div
          className="bar__fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: value / 100 } : {}}
          transition={{ duration: 1.6, ease, delay }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="about">
      <Hero />

      <section className="section">
        <div className="container">
          <SectionHead num="01" label="Introduction" title={[["Namaste,"], ["I'm Devansh.", "serif"]]} />
          <ScrollWords
            className="display about__intro"
            highlight={["india", "linux", "keyboard"]}
            text="Born and raised in India, I'm a Computer Science student who loves building software from the ground up. In my free time you'll usually find me exploring Linux or building side projects. Honestly, if writing code could wear out a keyboard, mine would've retired by now."
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead num="02" label="Backstory" title={[["Character"], ["sheet.", "serif"]]} />
          <div className="sheet">
            {backstory.map(([k, v], i) => (
              <Reveal key={k} className="sheet__row invert-block" delay={i * 0.06} y={20}>
                <span className="hud-label faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="hud-label muted">{k}</span>
                <span className="sheet__value">{v}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead num="03" label="Education" title={[["Always"], ["learning.", "serif"]]} />
          <div className="hairline-grid edu">
            {education.map((e, i) => (
              <Reveal key={e.title} className="edu__card" delay={i * 0.12}>
                <div className="edu__top">
                  <span className="edu__seal">
                    {e.logo ? (
                      <>
                        {/* Dark-theme copy has its black ink lifted to light so it reads on dark. */}
                        <img className="edu__logo edu__logo--light" src={e.logo} alt={`${e.place} emblem`} loading="lazy" />
                        <img className="edu__logo edu__logo--dark" src={e.logoDark} alt="" loading="lazy" />
                      </>
                    ) : (
                      <SelfLearningSeal />
                    )}
                  </span>
                  <span className="edu__meta">
                    <span className="hud-label accent">{e.period}</span>
                    <span className="edu__plus">+</span>
                  </span>
                </div>
                <h3 className="edu__title">{e.title}</h3>
                <p className="serif edu__place">{e.place}</p>
                <p className="muted edu__body">{e.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about__split">
          <div>
            <SectionHead num="04" label="Skills" title={[["Stats."]]} />
            <Bars data={skills} />
            <Reveal className="locked">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4.5" y="10.5" width="15" height="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              <span className="hud-label">Hire to unlock other abilities</span>
            </Reveal>
          </div>
          <div>
            <SectionHead num="05" label="Outside of code" title={[["Side"], ["quests.", "serif"]]} />
            <Bars data={hobbies} />
          </div>
        </div>
      </section>

      <section className="section journey">
        <div className="container">
          <SectionHead num="06" label="Journey" title={[["So far,"], ["so good.", "serif"]]} />
          <div className="hairline-grid journey__grid">
            {journey.map((col, ci) => (
              <div key={col.title} className="journey__col">
                <span className="hud-label muted">{col.title}</span>
                <ol>
                  {col.items.map((it, i) => (
                    <Reveal as="li" key={it} delay={ci * 0.1 + i * 0.08} y={24}>
                      <span className="hud-label accent">0{i + 1}</span>
                      <span>{it}</span>
                    </Reveal>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead num="07" label="Toolbox" title={[["Daily"], ["drivers.", "serif"]]} />
          <div className="hairline-grid toolbox">
            {tools.map((t, i) => (
              <Reveal key={t.name} className="toolbox__item" delay={(i % 6) * 0.05} y={24}>
                <span className="tool-chip toolbox__chip">
                  <img src={t.icon} alt="" loading="lazy" />
                </span>
                <span className="hud-label muted">{t.name}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
