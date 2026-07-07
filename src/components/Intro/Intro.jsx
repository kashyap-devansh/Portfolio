import "./Intro.css";
import { motion } from "framer-motion";
import PortfolioImage from "../../assets/portfolio_image.png";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Intro = () => {
  return (
    <section className="intro">
      <span className="intro-label">INTRO</span>

      <motion.div
        className="intro-content"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 variants={item}>
          I am a developer passionate about building software from the
        </motion.h2>

        <motion.h2 variants={item}>
          ground up. From creating an interpreted programming language
        </motion.h2>

        <motion.h2 variants={item}>
          and a SQL-like database engine to experimenting with developer
        </motion.h2>

        <motion.h2 variants={item}>
          tools and web applications, I enjoy turning ideas into working
        </motion.h2>

        <motion.h2 variants={item}>
          systems.
        </motion.h2>

        <motion.h2 variants={item}>
          My goal is to master the foundations of software engineering and
        </motion.h2>

        <motion.h2 variants={item}>
          build technology that is efficient, reliable, and crafted with a deep
        </motion.h2>

        <motion.h2 variants={item}>
          understanding of how it works behind the scenes.
        </motion.h2>

        <motion.div className="author" variants={item}>
          <div className="author-img-wrapper">
            <img src={PortfolioImage} alt="Devansh Kashyap" />
          </div>

          <div className="author-info">
            <span>DEVANSH KASHYAP</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="work-heading"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h1 variants={item}>
          selected work
        </motion.h1>

        <motion.div className="tags" variants={container}>
          <motion.span variants={item}>systems programming</motion.span>
          <motion.span variants={item}>language design</motion.span>
          <motion.span variants={item}>backend engineering</motion.span>
          <motion.span variants={item}>web development</motion.span>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Intro;
