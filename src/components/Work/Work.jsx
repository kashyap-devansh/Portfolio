import "./Work.css";
import image from "../../assets/portfolio_image.png"


const projects = [
  {
    id: 1,
    title: "Matching Cards",
    image: image,
    tags: ["PRODUCT DESIGNER", "REVENUE BOOST"],
  },
  {
    id: 2,
    title: "The Road Home",
    image: image,
    tags: ["USABILITY TESTER", "USER RESEARCH"],
  },
  {
    id: 3,
    title: "Project Three",
    image: image,
    tags: ["UI DESIGN"],
  },
  {
    id: 4,
    title: "Project Four",
    image: image,
    tags: ["FRONTEND", "REACT"],
  },
];

const Work = () => {
  return (
    <section className="work">
      <div className="work-grid">
        {
          projects.map((project) => (
            <div className="work-card" key={project.id}>
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

              <h2 className="work-title">{project.title}</h2>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default Work;
