import background from "../../assets/contact_bg.png";
import hero from "../../assets/hero.png";

import "./contact-Hero.css"

const ContactHero = () => {
  return (
    <div className="contact-hero">

      <div className="wallpaper">
        <img className="wallpaper-img" src={background} alt="" decoding="async" />
        <div className="wallpaper-overlay" />
      </div>

      <div className="content">
        <div className="line-1">
          <h1>LET'S WORK</h1>
        </div>
      </div>

      <div className="sticker">
        <img className="sticker-img" src={hero} alt="" decoding="async" />
      </div>

      <div className="line-2">
        <h1>TOGETHER</h1>
      </div>
    </div>
  );
};

export default ContactHero;
