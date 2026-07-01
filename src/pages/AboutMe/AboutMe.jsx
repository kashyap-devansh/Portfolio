import AboutMeHero from "./AboutMeHero/AboutMeHero.jsx";
import Links from "./Links/Links.jsx";
import Introduction from "./Introduction/Introduction.jsx";
import Education from "./Education/Education.jsx";
import "./AboutMe.css";

const AboutMe = () => {
  return (
    <div className="aboutMe">
      <AboutMeHero />
      <Links />
      <Introduction />
      <Education />
    </div>
  )
}

export default AboutMe
