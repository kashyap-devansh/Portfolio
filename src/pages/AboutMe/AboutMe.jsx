import AboutMeHero from "./AboutMeHero/AboutMeHero.jsx";
import Links from "./Links/Links.jsx";
import Introduction from "./Introduction/Introduction.jsx";
import "./AboutMe.css";

const AboutMe = () => {
  return (
    <div className="aboutMe">
      <AboutMeHero />
      <Links />
      <Introduction />
    </div>
  )
}

export default AboutMe
