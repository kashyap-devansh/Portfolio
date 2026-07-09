import { motion } from "framer-motion";
import "./Introduction.css";

const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.25,
    },
  },
};

const line = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const Introduction = () => {
  return (
    <div className="introduction">
      <div className="introduction-content">
        <p>introduction</p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.9 }}
        >
          <motion.h2
            variants={line}
          >
            Hey! Namaste! I'm Devansh. Born and raised in India, I'm a Computer Science
          </motion.h2>

          <motion.h2
            variants={line}
          >
            student who loves building software from the ground up. During my free time,
          </motion.h2>

          <motion.h2
            variants={line}
          >
            you'll usually find me exploring Linux or building side projects. Honestly, if
          </motion.h2>

          <motion.h2
            variants={line}
          >
            writing code could wear out a keyboard, mine would've retired by now.
          </motion.h2>
        </motion.div>
      </div>
    </div>
  )
}

export default Introduction
