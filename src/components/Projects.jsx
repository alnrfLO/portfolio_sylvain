import React, { useState, useMemo } from "react";

export default function Projects({ projects, onOpen }) {
  const [filter, setFilter] = useState("TOUS");

  const categories = useMemo(
    () => ["TOUS", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );

  const filtered = filter === "TOUS" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section projects">
      <div className="section-header">
        <h2>Projets</h2>
        <p className="section-subtitle">Une sélection de projets récents</p>
      </div>

      <div className="projects-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map((project) => (
          <article
            key={project.name}
            className="project-card"
            onClick={() => onOpen(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") onOpen(project);
            }}
          >
            <div className={`project-icon ${project.wispColor}`}>{project.emoji}</div>
            <div className="project-info">
              <h3>{project.name}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((t) => (
                  <span key={t.label} className={`tag ${t.color}`}>
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-meta">
              <div className={`rank-badge ${project.rankClass}`}>{project.rank}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}