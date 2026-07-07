import "./WhatICanDo.css";
import { motion } from "framer-motion";

const skills = [
  "Programming Languages",
  "Backend Development",
  "System Programming",
  "Compiler Design",
  "Linux & Open Source",
];

const topText = {
  rest: {
    rotateX: 0,
    y: "0%",
    opacity: 1,
  },
  hover: {
    rotateX: -10,
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: "easeInOut",
    },
  },
};

const bottomText = {
  rest: {
    rotateX: 10,
    y: "100%",
    opacity: 0,
  },
  hover: {
    rotateX: 0,
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeInOut",
    },
  },
};

const WhatICanDo = () => {
  return (
    <section className="whatICanDo">
      <p>WHAT I CAN DO</p>

      <div className="expertise">
        {skills.map((skill) => (
          <motion.div
            key={skill}
            className="roll-heading"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.span
              className="front"
              variants={topText}
            >
              {skill}
            </motion.span>

            <motion.span
              className="back"
              variants={bottomText}
            >
              {skill}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhatICanDo;
