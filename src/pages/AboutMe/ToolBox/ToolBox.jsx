import C from "../../../assets/c.svg";
import Cpp from "../../../assets/cplusplus.svg";
import Arch from "../../../assets/archlinux.svg";
import CSS from "../../../assets/css.svg";
import Git from "../../../assets/git.svg";
import GitHub from "../../../assets/github.svg";
import Neovim from "../../../assets/neovim.svg";
import Codium from "../../../assets/vscodium.svg";
import HTML from "../../../assets/html5.svg";
import JavaScript from "../../../assets/javascript.svg";
import ReactLogo from "../../../assets/react.svg";
import Bash from "../../../assets/systems.svg";

import "./ToolBox.css";

const tools = [
  { name: "C", icon: C, exception: true },
  { name: "C++", icon: Cpp },
  { name: "JavaScript", icon: JavaScript },
  { name: "HTML5", icon: HTML },
  { name: "CSS3", icon: CSS },
  { name: "React", icon: ReactLogo },
  { name: "Arch Linux", icon: Arch },
  { name: "Bash", icon: Bash },
  { name: "Git", icon: Git },
  { name: "GitHub", icon: GitHub },
  { name: "Neovim", icon: Neovim },
  { name: "VSCodium", icon: Codium },
];

const ToolBox = () => {
  return (
    <section className="toolBox-section">
      <p>toolBox</p>

      <div className="toolBox-grid">
        {tools.map((tool) => (

          <div className="tool-item" key={tool.name}>

            <div className={`toolBox-card ${tool.exception ? "exception" : ""}`}>

              <img src={tool.icon} alt={tool.name} />

            </div>

            <span className="tool-label">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToolBox;
