import { motion } from "framer-motion";
import Background from "../../../assets/journey.png";
import "./Journey.css";

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
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      durations: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const Journey = () => {
  return (
    <div className="journey">
      <img src={Background} alt="" className="bg" />

      <motion.div
        className="journey-content"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >

        <section className="journey-section">

          <motion.div
            className="section-title"
            variants={item}
          >
            <p>Engineering Experience</p>
          </motion.div>

          <motion.div
            className="section-items"
            variants={item}
          >

            <div className="journey-card">
              <span>01</span>
              <h6>Curio — Interpreted Language</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>02</span>
              <h6>Ark — SQL Database Engine</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>03</span>
              <h6>Ledger — Inventory Management System</h6>
              <span>+</span>
            </div>

          </motion.div>

        </section>

        <section className="journey-section">

          <motion.div
            className="section-title"
            variants={item}
          >
            <p>Learning Journey</p>
          </motion.div>

          <motion.div
            className="section-items"
            variants={item}
          >

            <div className="journey-card">
              <span>01</span>
              <h6>Started with C/C++</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>02</span>
              <h6>Switched to Linux</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>03</span>
              <h6>Found my passion for Systems</h6>
              <span>+</span>
            </div>

          </motion.div>

        </section>

        <section className="journey-section">

          <motion.div
            className="section-title"
            variants={item}
          >
            <p>Achievements</p>
          </motion.div>

          <motion.div
            className="section-items"
            variants={item}
          >

            <div className="journey-card">
              <span>01</span>
              <h6>Made projects from Scratch</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>02</span>
              <h6>Thousands of Lines of Code</h6>
              <span>+</span>
            </div>

            <div className="journey-card">
              <span>03</span>
              <h6>Open Source Enthusiast</h6>
              <span>+</span>
            </div>

          </motion.div>

        </section>

      </motion.div>
    </div>
  )
}

export default Journey
