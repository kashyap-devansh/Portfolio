import "./Intro.css";
import PortfolioImage from "../../assets/portfolio_image.png"

const Intro = () => {
  return (
    <section className="intro">
      <span className="intro-label">INTRO</span>

      <div className="intro-content">
        <h2>
          I am a developer passionate about building software from the ground
          up. From creating an interpreted programming language and a SQL-like
          database engine to experimenting with developer tools and web
          applications, I enjoy turning ideas into working systems.
        </h2>

        <h2>
          My goal is to master the foundations of software engineering and
          build technology that is efficient, reliable, and crafted with a deep
          understanding of how it works behind the scenes.
        </h2>

        <div className="author">
          <img src={PortfolioImage} alt="Devansh Kashyap" />

          <div className="author-info">
            <span>DEVANSH KASHYAP</span>
          </div>
        </div>
      </div>

      <div className="work-heading">
        <h1>
          selected work
        </h1>

        <div className="tags">
          <span>systems programming</span>
          <span>language desgin</span>
          <span>backend engineering</span>
          <span>web development</span>
        </div>
      </div>
    </section>
  );
};

export default Intro;
