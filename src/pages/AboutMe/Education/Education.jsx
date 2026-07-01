import School from "../../../assets/school.png";
import University from "../../../assets/university.png"
import SelfLearning from "../../../assets/self_learning.png";
import "./Education.css";

const Education = () => {
  return (
    <div className="education">
      <p className="education-eyebrow">Education</p>

      <div className="education-content-wrapper">
        <div className="education-content">

          <div className="education-card">

            <div className="img-wrapper">
              <img src={School} alt="" className="school" />
            </div>

            <h3>
              Higher Seconday Education @
              <br />
              M.M. International School
            </h3>
            <h6>
              Completed my schooling with a strong foundation in mathematics, science, and problem solving. Developed an early interest in computers that inspired me to pursue Computer Science.
            </h6>
          </div>

          <h2>+</h2>

          <div className="education-card">
            <div className="img-wrapper">
              <img src={University} alt="" className="university" />
            </div>

            <h3>
              B.Tech Computer Science @
              <br />
              Jaypee University of Information Technology
            </h3>
            <h6>
              Currently pursuing my bachelor's degree while building a strong foundation in software engineering, systems programming, and backend development through academic and personal projects.
            </h6>
          </div>

          <h2>+</h2>

          <div className="education-card">
            <div className="img-wrapper">
              <img src={SelfLearning} alt="" />
            </div>

            <h3>
              Self Learning &
              <br />
              Personal Projects
            </h3>

            <h6>
              Learned by building real software—from an interpreted programming language and a SQL-like database engine to backend applications and Linux-based development projects.
            </h6>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Education
