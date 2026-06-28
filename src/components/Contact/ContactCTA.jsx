
import GithubGray from "../../assets/github-gray.svg";
import GithubWhite from "../../assets/github-white.svg";
import LinkedInGray from "../../assets/linkedin-gray.svg";
import LinkedInWhite from "../../assets/linkedin-white.svg";
import GmailGray from "../../assets/gmail-gray.svg";
import GmailWhite from "../../assets/gmail-white.svg";
import "./ContactCTA.css";

const ContactCTA = () => {
  return (
    <div className="contact-cta">
      <div className="end-wrapper">
        <span>[</span>
        <p>END</p>
        <span>]</span>
      </div>

      <h2>
        I am always open to new projects, meaningful collaborations, and technical discussions. If you have an opportunity in mind or just want to talk about programming, I would love to hear from you.
      </h2>

      <h6 className="lets-chat">
        <span>LET'S CHAT</span>
      </h6>

      <div className="question">
        <span>MORE</span>
        <span>ABOUT</span>
        <span>ME?</span>
      </div>

      <div className="links">

        <a href="https://www.github.com/kashyap-devansh" className="social-link github" target="_black">
          <div className="logo-wrapper">
            <img src={GithubGray} alt="Github" className="logo normal" />
            <img src={GithubWhite} alt="Github" className="logo hover" />
          </div>
        </a>

        <a href="/" className="social-link linkedIn" target="_blank">
          <div className="logo-wrapper">
            <img src={LinkedInGray} alt="LinkedIn" className="logo normal" />
            <img src={LinkedInWhite} alt="LinkedIn" className="logo hover" />
          </div>
        </a>

        <a href="/" className="social-link mail" target="_blank">
          <div className="logo-wrapper">
            <img src={GmailGray} alt="LinkedIn" className="logo normal" />
            <img src={GmailWhite} alt="LinkedIn" className="logo hover" />
          </div>
        </a>

      </div>

    </div>
  )
}

export default ContactCTA
