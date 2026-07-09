import { motion } from "framer-motion";
import C from "../../../assets/c.svg";
import Cpp from "../../../assets/cplusplus.svg";
import Arch from "../../../assets/archlinux.svg";
import CSS from "../../../assets/css.svg";
import Git from "../../../assets/git.svg";
import GitHub from "../../../assets/github.svg";
import Neovim from "../../../assets/neovim.svg";
import Codium from "../../../assets/vscodium.svg";
import HTML from "../../../assets/html5.svg";
import JavaScript from "../../../assets/javascript.svg";
import ReactLogo from "../../../assets/react.svg";
import Bash from "../../../assets/systems.svg";
import "./ToolBox.css";

const tools = [
  { name: "C", icon: C, exception: true },
  { name: "C++", icon: Cpp },
  { name: "JavaScript", icon: JavaScript },
  { name: "HTML5", icon: HTML },
  { name: "CSS3", icon: CSS },
  { name: "React", icon: ReactLogo },
  { name: "Arch Linux", icon: Arch },
  { name: "Bash", icon: Bash },
  { name: "Git", icon: Git },
  { name: "GitHub", icon: GitHub },
  { name: "Neovim", icon: Neovim },
  { name: "VSCodium", icon: Codium },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const ToolBox = () => {
  return (
    <section className="toolBox-section">
      <p>toolBox</p>
      <motion.div
        className="toolBox-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {
          tools.map((tool) => (
            <motion.div className="tool-item" key={tool.name} variants={item}>
              <motion.div
                className={`toolBox-card ${tool.exception ? "exception" : ""}`}
                whileHover={{
                  y: -6,
                  scale: 1.08,
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
              >
                <img src={tool.icon} alt={tool.name} />
              </motion.div>
              <span className="tool-label">{tool.name}</span>
            </motion.div>
          ))
        }
      </motion.div>
    </section>
  );
};

export default ToolBox;
