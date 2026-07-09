import { motion } from "framer-motion";
import "./OutSideOfCode.css";
import Background from "../../../assets/outSideOfCodeBg.png";

const asideData = [
  {
    label: "gaming",
    value: "64%",
  },
  {
    label: "movies",
    value: "70%",
  },
  {
    label: "music",
    value: "87%",
  },
  {
    label: "anime",
    value: "70%",
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

const OutSideOfCode = () => {
  return (
    <>
      <div className="outSideOfCode">
        <div className="outSideOfCode-content">
          <p>outSideOfCode</p>
          <motion.div
            className="info"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {
              asideData.map((skill, index) => (
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

          </motion.div>
        </div>
      </div>
      <img className="background" src={Background} alt="" />

    </>
  )
}

export default OutSideOfCode
