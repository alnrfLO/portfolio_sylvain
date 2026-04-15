import React from "react";

const timeline = [
  {
    year: "2021",
    title: "Brevet des collèges",
    subtitle: "Mention Bien",
    school: "Collège Auguste Delaune, Bobigny",
    type: "education",
  },
  {
    year: "2023",
    title: "Baccalauréat",
    subtitle: "Spécialités Mathématiques & NSI",
    school: "Lycée Paul Le Rolland, Drancy",
    type: "education",
  },
  {
    year: "2023 – Aujourd'hui",
    title: "BUT MMI",
    subtitle: "2e année",
    school: "IUT de Bobigny, Université Sorbonne Paris Nord",
    description: "Parcours Développement Web",
    type: "education",
  },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section-header">
        <h2>Parcours</h2>
        <p className="section-subtitle">Formation et expérience académique</p>
      </div>

      <div className="timeline">
        {timeline.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot"></div>
            </div>
            <div className="timeline-content">
              <div className="timeline-year">{item.year}</div>
              <h3>{item.title}</h3>
              {item.subtitle && <p className="timeline-subtitle">{item.subtitle}</p>}
              <p className="timeline-school">{item.school}</p>
              {item.description && (
                <p className="timeline-description">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="about-ctas">
        <a href="/cv.pdf" className="btn btn-secondary" download>
          ⬇ Télécharger mon CV
        </a>
        <a href="/cv.pdf" className="btn btn-secondary" target="_blank" rel="noreferrer">
          👁 Voir le CV
        </a>
      </div>
    </section>
  );
}