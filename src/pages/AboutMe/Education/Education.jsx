import { motion } from "framer-motion";
import School from "../../../assets/school.png";
import University from "../../../assets/university.png"
import SelfLearning from "../../../assets/self_learning.png";
import "./Education.css";

const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.35,
      staggerChildren: 0.25,
    },
  },
};

const card = {
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

const Education = () => {
  return (
    <div className="education">
      <p className="education-eyebrow">Education</p>

      <motion.div
        className="education-content-wrapper"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="education-content">

          <motion.div
            className="education-card"
            variants={card}
          >

            <div className="img-wrapper">
              <img src={School} alt="" className="school" />
            </div>

            <h3>
              Higher Seconday Education @
              <br />
              M.M. International School
            </h3>
            <h6>
              Completed my schooling with a strong foundation in mathematics, science, and problem solving. Developed an early interest in computers that inspired me to pursue Computer Science.
            </h6>
          </motion.div>

          <h2>+</h2>

          <motion.div
            className="education-card"
            variants={card}
          >
            <div className="img-wrapper">
              <img src={University} alt="" className="university" />
            </div>

            <h3>
              B.Tech Computer Science @
              <br />
              Jaypee University of Information Technology
            </h3>
            <h6>
              Currently pursuing my bachelor's degree while building a strong foundation in software engineering, systems programming, and backend development through academic and personal projects.
            </h6>
          </motion.div>

          <h2>+</h2>

          <motion.div
            className="education-card"
            variants={card}
          >
            <div className="img-wrapper">
              <img src={SelfLearning} alt="" />
            </div>

            <h3>
              Self Learning &
              <br />
              Personal Projects
            </h3>

            <h6>
              Learned by building real software—from an interpreted programming language and a SQL-like database engine to backend applications and Linux-based development projects.
            </h6>
          </motion.div>
        </div>
      </motion.div>

    </div>
  )
}

export default Education
