import { motion } from "framer-motion";
import "./Work.css";
import Ark from "../../assets/Ark.png";
import Curio from "../../assets/Curio.png";
import Scrive from "../../assets/Scrive.png";
import UNO from "../../assets/UNO.png";

const projects = [
  {
    id: 1,
    title: "Project One",
    image: Ark,
    tags: ["TAG", "TAG"],
  },
  {
    id: 2,
    title: "Project Two",
    image: Curio,
    tags: ["TAG", "TAG"],
  },
  {
    id: 3,
    title: "Project Three",
    image: Scrive,
    tags: ["TAG"],
  },
  {
    id: 4,
    title: "Project Four",
    image: UNO,
    tags: ["TAG", "TAG"],
  },
];

const Work = () => {
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

                <img src={project.image} alt={project.title} />

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
