import GithubGray from "../../../assets/github-gray.svg";
import LinkedInGray from "../../../assets/linkedin-gray.svg";
import GmailGray from "../../../assets/gmail-gray.svg";
import "./Links.css";

const Links = () => {
  return (
    <div className="AboutLinks">
      <h6 className="resume-btn">
        <span>VIEW RESUME</span>
      </h6>

      <div className="eyebrow">
        <span>MORE</span>
        <span>ABOUT</span>
        <span>ME?</span>
      </div>

      <div className="about-links">

        <a href="https://www.github.com/kashyap-devansh" className="social-link github-link" target="_black">
          <div className="links-wrapper">
            <img src={GithubGray} alt="Github" className="link" />
          </div>
        </a>

        <a href="/" className="social-link linkedIn-link" target="_blank">
          <div className="links-wrapper">
            <img src={LinkedInGray} alt="LinkedIn" className="link" />
          </div>
        </a>

        <a href="/" className="social-link mail-link" target="_blank">
          <div className="links-wrapper">
            <img src={GmailGray} alt="LinkedIn" className="link" />
          </div>
        </a>


      </div>
    </div>
  )
}

export default Links
