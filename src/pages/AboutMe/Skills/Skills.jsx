import { motion } from "framer-motion";
import "./Skills.css";
import Lock from "../../../assets/lock.svg";

const skillsData = [
  {
    label: "coding",
    value: "98%"
  },
  {
    label: "linux",
    value: "80%"
  },
  {
    label: "curiosity",
    value: "95%"
  },
  {
    label: "teamwork",
    value: "88%"
  },
  {
    label: "yapping nonsense",
    value: "100%",
    className: "yapping"
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.35,
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 300,
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

const Skills = () => {
  return (
    <div className="skills">
      <div className="skills-content">
        <p>skills</p>
        <motion.div
          className="info"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {
            skillsData.map((skill, index) => (
              <motion.div
                className="info-item"
                key={skill.label}
                variants={item}
              >

                <h6 className="info-label">{skill.label} :</h6>

                <div className="info-value">

                  <motion.div
                    className={`value ${skill.className || skill.label}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.value }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                      delay: index * 0.15,
                    }}
                    viewport={{ once: true, amount: 0.9 }}
                  />
                </div>
              </motion.div>
            ))
          }

          <div className="box">
            <img src={Lock} alt="" className="lock" />
            <span>hire to unlock other ability</span>
          </div>

          <div className="dummy1"></div>
          <div className="dummy2"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
