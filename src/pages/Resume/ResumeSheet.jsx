import { resume } from "../../data/resume.js";

/*
  The résumé as a sheet of paper. With `links` it is the web version
  (everything clickable); without, it is the PDF version — plain text only,
  no hyperlinks and no live-demo markers.
*/
export default function ResumeSheet({ links = true }) {
  const { contact } = resume;

  const L = ({ href, children }) =>
    links ? (
      <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
        {children}
      </a>
    ) : (
      <span>{children}</span>
    );

  return (
    <article className={`sheet-cv ${links ? "" : "sheet-cv--pdf"}`}>
      <header className="cv__head">
        <h1 className="cv__name">{resume.name}</h1>
        <p className="cv__headline">{resume.headline}</p>
        <p className="cv__contact">
          <L href={`mailto:${contact.email}`}>{contact.email}</L>
          <i>•</i>
          <L href={`https://${contact.github}`}>{contact.github}</L>
          <i>•</i>
          <L href={`https://${contact.portfolio}`}>{contact.portfolio}</L>
        </p>
      </header>

      <p className="cv__summary">{resume.summary}</p>

      <section className="cv__section">
        <h2>Education</h2>
        {resume.education.map((e) => (
          <div key={e.school} className="cv__block">
            <div className="cv__row">
              <strong>{e.school}</strong>
              <span className="cv__meta">{e.place}</span>
            </div>
            {e.rows.map(([what, when]) => (
              <div key={what} className="cv__row">
                <span>{what}</span>
                <em className="cv__meta">{when}</em>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="cv__section">
        <h2>Technical Skills</h2>
        <dl className="cv__skills">
          {resume.skills.map(([k, v]) => (
            <div key={k}>
              <dt>{k}:</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="cv__section">
        <h2>Projects</h2>
        {resume.projects.map((p) => (
          <div key={p.name} className="cv__block">
            <div className="cv__row">
              <strong>
                <L href={p.repo}>{p.name}</L> <span className="cv__dash">—</span> {p.kind}
              </strong>
              <span className="cv__meta">
                {p.stack}
                {links && p.live && (
                  <>
                    {" · "}
                    <a href={p.live} target="_blank" rel="noreferrer" className="cv__live">
                      Live ↗
                    </a>
                  </>
                )}
                {links && (
                  <>
                    {" · "}
                    <a href={p.repo} target="_blank" rel="noreferrer">
                      Code ↗
                    </a>
                  </>
                )}
              </span>
            </div>
            <ul>
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="cv__section">
        <h2>Experience &amp; Activities</h2>
        {resume.experience.map((x) => (
          <div key={x.role} className="cv__block">
            <div className="cv__row">
              <strong>
                {x.role} <span className="cv__dash">—</span> {x.org}
              </strong>
            </div>
            <ul>
              {x.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="cv__section">
        <h2>Soft Skills</h2>
        <p className="cv__soft">
          {resume.softSkills.map((s, i) => (
            <span key={s}>
              {i > 0 && <i>•</i>}
              {s}
            </span>
          ))}
        </p>
      </section>
    </article>
  );
}
