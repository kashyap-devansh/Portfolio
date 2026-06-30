import "./MYStack.css"
import MyStackBG from "../../assets/MyStack_bg.png";
import Langauges from "../../assets/languages.svg";
import Frontend from "../../assets/frontend.svg";
import Systems from "../../assets/systems.svg";
import Interests from "../../assets/interests.svg";

const Stack = [
  {
    id: 1,
    heading: "LANGUAGES",
    svg: Langauges,
    tech: ["C", "C++", "JavaScript"],
  },
  {
    id: 2,
    heading: "FRONTEND",
    svg: Frontend,
    tech: ["HTML", "CSS", "React"],
  },
  {
    id: 3,
    heading: "SYSTEMS",
    svg: Systems,
    tech: ["Linux", "Git", "Neovim"],
  },
  {
    id: 4,
    heading: "CORE INTERESTS",
    svg: Interests,
    tech: ["Systems", "Backend", "Languages"],
  },
];

const MyStack = () => {
  return (
    <section className="my-stack">
      <img src={MyStackBG} alt="" className="my-stack-bg" />

      <h1>TECHNOLOGIES</h1>

      <div className="stack-keywords">
        <p>BUILD</p>
        <p>CREATE</p>
        <p>OPTIMIZE</p>
        <p>DEPLOY</p>
      </div>

      <div className="stack-flex">
        {Stack.map((stack) => (
          <div className="tech-card" key={stack.id}>
            <h2 className="tech-title">{stack.heading}</h2>

            <div className="tech-image">
              <img src={stack.svg} alt={stack.heading} />
            </div>

            <div className="tech-tags">
              {stack.tech.map((item, index) => (
                <span key={index} className="tech-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default MyStack;

