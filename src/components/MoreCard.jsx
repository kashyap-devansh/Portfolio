import { Link } from "react-router-dom";
import { Arrow } from "./motion.jsx";
import { profile } from "../data/site.js";
import "./MoreCard.css";

/* Fills the gap an odd project count leaves in the two-column grid. */
export default function MoreCard({ to }) {
  const body = (
    <>
      <span className="hud-label faint">Next</span>
      <span className="more-card__title display">
        {to ? (
          <>
            See every <span className="serif">project.</span>
          </>
        ) : (
          <>
            More experiments <span className="serif">on GitHub.</span>
          </>
        )}
      </span>
      <span className="hud-label more-card__cta">
        {to ? "All projects" : "github.com/kashyap-devansh"} <Arrow />
      </span>
    </>
  );

  return to ? (
    <Link to={to} className="more-card">
      {body}
    </Link>
  ) : (
    <a href={profile.github} target="_blank" rel="noreferrer" className="more-card">
      {body}
    </a>
  );
}
