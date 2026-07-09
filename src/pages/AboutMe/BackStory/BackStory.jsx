import { motion } from "framer-motion";
import "./BackStory.css";

const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.35,
      staggerChildren: 0.25,
    },
  },
};

const info = {
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


const BackStory = () => {
  return (
    <div className="backstory">
      <div className="backstory-content">
        <p>backstory</p>

        <motion.div
          className="info"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            className="info-item"
            variants={info}
          >
            <h6 className="info-label">race :</h6>
            <h6 className="info-value">human</h6>
          </motion.div>

          <motion.div
            className="info-item"
            variants={info}
          >
            <h6 className="info-label">age :</h6>
            <h6 className="info-value">19</h6>
          </motion.div>

          <motion.div
            className="info-item"
            variants={info}
          >
            <h6 className="info-label">languages :</h6>
            <h6 className="info-value">hindi/english</h6>
          </motion.div>

          <motion.div
            className="info-item"
            variants={info}
          >
            <h6 className="info-label">finanical :</h6>
            <h6 className="info-value">broke</h6>
          </motion.div>

          <motion.div
            className="info-item"
            variants={info}
          >
            <h6 className="info-label">height</h6>
            <h6 className="info-value">classified</h6>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}

export default BackStory
