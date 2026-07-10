import { motion } from "framer-motion";
import "./Projects.css";
import Background from "../../assets/projects_bg.png";
import Ark from "../../assets/Ark.png";
import Curio from "../../assets/Curio.png";
import Scrive from "../../assets/Scrive.png";
import UNO from "../../assets/UNO.png";
import Ledger from "../../assets/Ledger.png";

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
    tags: ["Card Game", "OPP"],
  },
  {
    id: 5,
    title: "Ledger System",
    image: Ledger,
    tags: ["Inventory", "Management"],
  }
];

const Projects = ({ setCursorVariant }) => {
  return (
    <div className="projects">
      <img src={Background} alt="" />

      <motion.h1
        className="projects-heading"
        initial={{
          opacity: 0,
          x: -200
        }}
        whileInView={{
          opacity: 1,
          x: 0
        }}
        transition={{
          duration: 0.7,
          ease: [0.25, 1, 0.5, 1]
        }}
        viewport={{
          once: true,
          amount: 0.5
        }}
      >
        /ll projects
      </motion.h1>

      <div className="total-projects">
        <h6>total</h6>
        <h6>{projects.length}</h6>
        <h6>projects</h6>
      </div>

      <div className="projects-grid">
        {
          projects.map((project) => (
            <motion.div
              className="projects-card"
              key={project.id}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
            >
              <div className="projects-image">

                <img
                  src={project.image}
                  alt={project.title}
                  onMouseEnter={() => setCursorVariant("view")}
                  onMouseLeave={() => setCursorVariant("default")}
                />

                <div className="projects-tags">
                  {
                    project.tags.map((tag, index) => (
                      <span key={index} className="projects-tag">
                        {tag}
                      </span>
                    ))
                  }
                </div>

              </div>

              <motion.h2
                className="projects-title"
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
                {project.title}
              </motion.h2>
            </motion.div>
          ))
        }
      </div>
    </div>
  )
}

export default Projects
