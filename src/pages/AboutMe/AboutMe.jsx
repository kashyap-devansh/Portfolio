import AboutMeHero from "./AboutMeHero/AboutMeHero.jsx";
import Links from "./Links/Links.jsx";
import Introduction from "./Introduction/Introduction.jsx";
import Education from "./Education/Education.jsx";
import BackStory from "./BackStory/BackStory.jsx";
import Skills from "./Skills/Skills.jsx";
import "./AboutMe.css";

const AboutMe = () => {
  return (
    <div className="aboutMe">
      <AboutMeHero />
      <Links />
      <Introduction />
      <Education />
      <BackStory />
      <Skills />
    </div>
  )
}

export default AboutMe
