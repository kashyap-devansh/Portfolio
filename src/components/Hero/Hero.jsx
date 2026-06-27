import "./Hero.css";
import heroImage from "../../assets/hero-bg.png"

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-content">
        <h1>
          DEVΛNSH
          <br />
          KΛSHYΛP
        </h1>
        <div className="hero-subtitle">
          <p>Software Developer</p>
          <p>& Problem Solver</p>
        </div>
      </div>

      <img src={heroImage} alt="" className="hero-image" />

    </section>
  );
};
export default Hero;
