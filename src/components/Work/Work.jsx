import { motion } from "framer-motion";
import "./Work.css";
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

              <h2
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

              >{project.title}</h2>
            </motion.div>
          ))
        }
      </div>
    </section>
  );
};

export default Work;
