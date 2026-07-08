import { motion } from "framer-motion";
import "./AboutMeHero.css";

const premiumEase = [0.16, 1, 0.3, 1];

const AboutMeHero = () => {
  return (
    <div className="aboutMeHero">
      <div className="heading-wrapper">
        <motion.h1
          initial={{
            opacity: 0,
            y: 300,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.1,
            ease: premiumEase,
            delay: 0,
          }}
          viewport={{
            once: true,
            amount: 0.8,
          }}
        >
          /bout
        </motion.h1>

        <motion.h1
          initial={{
            opacity: 0,
            y: -300,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.1,
            ease: premiumEase,
            delay: 0.15,
          }}
          viewport={{
            once: true,
            amount: 0.8,
          }}
        >
          devansh
        </motion.h1>
      </div>

      <div className="greetings">
        <span>Hello</span>
        <span>^_^</span>
        <span>Hola</span>
      </div>
    </div>
  )
};

export default AboutMeHero;
