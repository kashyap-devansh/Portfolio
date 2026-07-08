import "./MYStack.css"
import { motion } from "framer-motion";
import MyStackBG from "../../assets/MyStack_bg.png";
import Langauges from "../../assets/languages.svg";
import Frontend from "../../assets/frontend.svg";
import Systems from "../../assets/systems.svg";
import Interests from "../../assets/interests.svg";

const Stack = [
  {
    id: 1,
    heading: "LANGUAGES",
    svg: Langauges,
    tech: ["C", "C++", "JavaScript"],
  },
  {
    id: 2,
    heading: "FRONTEND",
    svg: Frontend,
    tech: ["HTML", "CSS", "React"],
  },
  {
    id: 3,
    heading: "SYSTEMS",
    svg: Systems,
    tech: ["Linux", "Git", "Neovim"],
  },
  {
    id: 4,
    heading: "CORE INTERESTS",
    svg: Interests,
    tech: ["Systems", "Backend", "Languages"],
  },
];
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
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
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
const CardContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};
const Card = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const MyStack = () => {
  return (
    <section className="my-stack">
      <img src={MyStackBG} alt="" className="my-stack-bg" />
      <motion.h1
        initial={{
          opacity: 0,
          y: 100,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          amount: 0.7,
        }}
      >TECHNOLOGIES</motion.h1>
      <motion.div
        className="stack-keywords"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 1 }}
      >
        <motion.p variants={item}>BUILD</motion.p>
        <motion.p variants={item}>CREATE</motion.p>
        <motion.p variants={item}>OPTIMIZE</motion.p>
        <motion.p variants={item}>DEPLOY</motion.p>
      </motion.div>
      <motion.div
        className="stack-flex"
        variants={CardContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {
          Stack.map((stack) => (
            <motion.div
              className="tech-card"
              key={stack.id}
              variants={Card}
              whileHover={{
                y: -12,
                scale: 1.1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <h2 className="tech-title">{stack.heading}</h2>
              <div className="tech-image">
                <img src={stack.svg} alt={stack.heading} />
              </div>
              <div className="tech-tags">
                {stack.tech.map((item, index) => (
                  <span key={index} className="tech-tag">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        }
      </motion.div>
    </section >
  );
};
export default MyStack;
