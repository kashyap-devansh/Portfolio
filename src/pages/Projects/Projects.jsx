import { motion } from "framer-motion";
import "./Projects.css";
import Background from "../../assets/projects_bg.png";
import image from "../../assets/portfolio_image.png"

const projects = [
  {
    id: 1,
    title: "Project One",
    image: image,
    tags: ["TAG", "TAG"],
  },
  {
    id: 2,
    title: "Project Two",
    image: image,
    tags: ["TAG", "TAG"],
  },
  {
    id: 3,
    title: "Project Three",
    image: image,
    tags: ["TAG"],
  },
  {
    id: 4,
    title: "Project Four",
    image: image,
    tags: ["TAG", "TAG"],
  },
  {
    id: 5,
    title: "Project Five",
    image: image,
    tags: ["TAG", "TAG"],
  }
];

const Projects = () => {
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

                <img src={project.image} alt={project.title} />

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

              <h2
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
              </h2>
            </motion.div>
          ))
        }
      </div>
    </div>
  )
}

export default Projects
