import { motion } from "framer-motion";
import "./Name.css";
const Name = () => {
  return (
    <div className="name">
      <motion.h1
        initial={{
          opacity: 0, y: 150
        }}
        whileInView={{
          opacity: 1, y: 0
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.8, ease: "easeOut"
        }}
      >
        DEVΛNSH KΛSHYΛP
      </motion.h1>

    </div>
  )
}

export default Name
