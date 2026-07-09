import { defaultValueTypes, motion } from "framer-motion";
import GithubGray from "../../../assets/github-gray.svg";
import LinkedInGray from "../../../assets/linkedin-gray.svg";
import GmailGray from "../../../assets/gmail-gray.svg";
import "./Links.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.25,
    },
  },
};

const iconVariants = {
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

const Links = () => {
  return (
    <div className="AboutLinks">
      <motion.h6
        className="resume-btn"
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
          type: "spring",
          stiffness: 250,
          damping: 25,
          mass: 0.1,
        }}
        viewport={{
          once: true,
          amount: 0.9,
        }}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.9,
        }}
      >
        <span>VIEW RESUME</span>
      </motion.h6>

      <div className="eyebrow">
        <span>MORE</span>
        <span>ABOUT</span>
        <span>ME?</span>
      </div>

      <motion.div
        className="about-links"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.9 }}
      >
        <motion.a
          href="https://www.github.com/kashyap-devansh"
          className="social-link github-link"
          target="_blank"
          variants={iconVariants}
        >
          <div className="links-wrapper">
            <img src={GithubGray} alt="Github" className="link" />
          </div>
        </motion.a>

        <motion.a
          href="/"
          className="social-link linkedIn-link"
          target="_blank"
          variants={iconVariants}
        >
          <div className="links-wrapper">
            <img src={LinkedInGray} alt="LinkedIn" className="link" />
          </div>
        </motion.a>

        <motion.a
          href="/"
          className="social-link mail-link"
          target="_blank"
          variants={iconVariants}
        >
          <div className="links-wrapper">
            <img src={GmailGray} alt="Gmail" className="link" />
          </div>
        </motion.a>
      </motion.div>
    </div>
  )
}

export default Links
