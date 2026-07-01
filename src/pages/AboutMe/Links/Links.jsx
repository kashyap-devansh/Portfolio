import GithubGray from "../../../assets/github-gray.svg";
import LinkedInGray from "../../../assets/linkedin-gray.svg";
import GmailGray from "../../../assets/gmail-gray.svg";
import "./Links.css";

const Links = () => {
  return (
    <div className="AboutLinks">
      <h6 className="chat-btn">
        <span>LET'S CHAT</span>
      </h6>

      <div className="eyebrow">
        <span>MORE</span>
        <span>ABOUT</span>
        <span>ME?</span>
      </div>

      <div className="about-links">

        <a href="https://www.github.com/kashyap-devansh" className="social-link github" target="_black">
          <div className="logo-wrapper">
            <img src={GithubGray} alt="Github" className="logo" />
          </div>
        </a>

        <a href="/" className="social-link linkedIn" target="_blank">
          <div className="logo-wrapper">
            <img src={LinkedInGray} alt="LinkedIn" className="logo" />
          </div>
        </a>

        <a href="/" className="social-link mail" target="_blank">
          <div className="logo-wrapper">
            <img src={GmailGray} alt="LinkedIn" className="logo" />
          </div>
        </a>


      </div>
    </div>
  )
}

export default Links
