import { motion } from "framer-motion";
import "./Work.css";
import Ark from "../../assets/Ark.png";
import Curio from "../../assets/Curio.png";
import Scrive from "../../assets/Scrive.png";
import UNO from "../../assets/UNO.png";

const projects = [
  {
    id: 1,
    title: "Ark SQL",
    image: Ark,
    tags: ["SQL Engine", "Database"],
  },
  {
    id: 2,
    title: "Curio Language",
    image: Curio,
    tags: ["Interpreter", "Language"],
  },
  {
    id: 3,
    title: "Scrive Editor",
    image: Scrive,
    tags: ["Text Editor", "Terminal"],
  },
  {
    id: 4,
    title: "UNO Game",
    image: UNO,
    tags: ["Card Game", "OOP"],
  },
];

const Work = ({ setCursorVariant }) => {
  return (
    <section className="work">
      <div className="work-grid">
        {
          projects.map((project) => (
            <motion.div
              className="work-card"
              key={project.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
            >
              <div className="work-image">

                <img
                  src={project.image}
                  alt={project.title}
                  onMouseEnter={() => setCursorVariant("view")}
                  onMouseLeave={() => setCursorVariant("default")}
                />

                <div className="work-tags">
                  {
                    project.tags.map((tag, index) => (
                      <span key={index} className="work-tag">
                        {tag}
                      </span>
                    ))
                  }
                </div>

              </div>

              <motion.h2
                className="work-title"
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}

              >{project.title}</motion.h2>
            </motion.div>
          ))
        }
      </div>
    </section>
  );
};

export default Work;
