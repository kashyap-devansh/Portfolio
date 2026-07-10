import { motion } from "framer-motion";
import GithubGray from "../../assets/github-gray.svg";
import GithubWhite from "../../assets/github-white.svg";
import LinkedInGray from "../../assets/linkedin-gray.svg";
import LinkedInWhite from "../../assets/linkedin-white.svg";
import GmailGray from "../../assets/gmail-gray.svg";
import GmailWhite from "../../assets/gmail-white.svg";
import "./ContactCTA.css";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const linkContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 2.2,
      staggerChildren: 0.3,
    },
  },
};

const linkItem = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const ContactCTA = () => {
  return (
    <motion.div
      className="contact-cta"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={item}>
        <div className="end-wrapper">
          <span>[</span>
          <p>END</p>
          <span>]</span>
        </div>
      </motion.div>

      <motion.h2 variants={item}>
        I am always open to new projects, meaningful collaborations, and technical discussions. If you
      </motion.h2>

      <motion.h2 variants={item}>
        have an opportunity in mind or just want to talk about programming, I would love to hear from
      </motion.h2>

      <motion.h2 variants={item}>
        you.
      </motion.h2>

      <motion.h6
        className="lets-chat"
        variants={item}
      >
        <span>LET'S CHAT</span>
      </motion.h6>

      <motion.div
        className="question"
        variants={item}
      >
        <span>MORE</span>
        <span>ABOUT</span>
        <span>ME?</span>
      </motion.div>

      <motion.div
        className="links"
        variants={linkContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 1 }}
      >

        <motion.a
          href="https://www.github.com/kashyap-devansh" className="social-link github" target="_black"
          variants={linkItem}
        >
          <div className="logo-wrapper">
            <img src={GithubGray} alt="Github" className="logo normal" />
            <img src={GithubWhite} alt="Github" className="logo hover" />
          </div>
        </motion.a>

        <motion.a
          href="/" className="social-link linkedIn" target="_blank"
          variants={linkItem}
        >
          <div className="logo-wrapper">
            <img src={LinkedInGray} alt="LinkedIn" className="logo normal" />
            <img src={LinkedInWhite} alt="LinkedIn" className="logo hover" />
          </div>
        </motion.a>

        <motion.a
          href="mailto:devansh14007@gmail.com" className="social-link mail"
          variants={linkItem}
        >
          <div className="logo-wrapper">
            <img src={GmailGray} alt="LinkedIn" className="logo normal" />
            <img src={GmailWhite} alt="LinkedIn" className="logo hover" />
          </div>
        </motion.a>

      </motion.div>

    </motion.div>
  )
}

export default ContactCTA
