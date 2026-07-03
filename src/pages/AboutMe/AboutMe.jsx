import AboutMeHero from "./AboutMeHero/AboutMeHero.jsx";
import Links from "./Links/Links.jsx";
import Introduction from "./Introduction/Introduction.jsx";
import Education from "./Education/Education.jsx";
import BackStory from "./BackStory/BackStory.jsx";
import Skills from "./Skills/Skills.jsx";
import OutSideOfCode from "./OutSideOfCode/OutSideOfCode.jsx";
import Journey from "./Journey/Journey.jsx";
import Footer from "../../components/Footer/Footer.jsx";

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
      <OutSideOfCode />
      <Journey />
      <Footer />
    </div>
  )
}

export default AboutMe
