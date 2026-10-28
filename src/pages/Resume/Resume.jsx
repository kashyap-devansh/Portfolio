import { motion } from "framer-motion";
import { Arrow, Magnetic, SplitWords, ease } from "../../components/motion.jsx";
import ResumeSheet from "./ResumeSheet.jsx";
import "./Resume.css";

// Built by `npm run resume:pdf` from /resume?pdf — the link-free version.
const PDF = "/resume.pdf";

export default function Resume() {
  return (
    <div className="resume-page">
      <header className="container resume-hero">
        <motion.p
          className="hud-label muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="accent">[CV]</span> Résumé — 2026
        </motion.p>
        <div className="resume-hero__row">
          <SplitWords
            as="h1"
            play
            delay={0.15}
            className="display resume-hero__title"
            parts={[["The short"], ["version.", "serif accent"]]}
          />
          <motion.div
            className="resume-hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.6 }}
          >
            <Magnetic>
              <a href={PDF} download="Devansh-Kashyap-Resume.pdf" className="btn btn--solid">
                Download PDF <Arrow />
              </a>
            </Magnetic>
            <a href={PDF} target="_blank" rel="noreferrer" className="btn btn--line">
              Open PDF
            </a>
          </motion.div>
        </div>
      </header>

      <motion.div
        className="container resume-stage"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease, delay: 0.5 }}
      >
        <ResumeSheet />
      </motion.div>
    </div>
  );
}
