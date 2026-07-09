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
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const journeyData = [
  {
    title: "Engineering Experience",
    items: [
      { num: "01", text: "Curio — Interpreted Language" },
      { num: "02", text: "Ark — SQL Database Engine" },
      { num: "03", text: "Ledger — Inventory Management System" },
    ],
  },
  {
    title: "Learning Journey",
    items: [
      { num: "01", text: "Started with C/C++" },
      { num: "02", text: "Switched to Linux" },
      { num: "03", text: "Found my passion for Systems" },
    ],
  },
  {
    title: "Achievements",
    items: [
      { num: "01", text: "Made projects from Scratch" },
      { num: "02", text: "Thousands of Lines of Code" },
      { num: "03", text: "Open Source Enthusiast" },
    ],
  },
];

const Journey = () => {
  return (
    <div className="journey">
      <img src={Background} alt="" className="bg" />
      <motion.div className="journey-content">
        {
          journeyData.map((section, sIndex) => (
            <motion.section
              className="journey-section"
              key={sIndex}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div className="section-title" variants={item}>
                <p>{section.title}</p>
              </motion.div>

              <motion.div className="section-items" variants={container}>
                {section.items.map((card) => (
                  <motion.div className="journey-card" key={card.num} variants={item}>
                    <span>{card.num}</span>
                    <h6>{card.text}</h6>
                    <span>+</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          ))
        }
      </motion.div>
    </div>
  );
};

export default Journey;
