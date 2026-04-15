import React, { useMemo, useState } from "react";

function ProjectCard({ p, onOpen }) {
  return (
    <article className="project-card" tabIndex={0} role="button" onClick={() => onOpen(p)} onKeyDown={(e) => { if (e.key === "Enter") onOpen(p); }}>
      <div className="project-meta">
        <div className={`wisp ${p.wispColor}`}>{p.emoji}</div>
      </div>
      <div className="project-body">
        <h4>{p.name}</h4>
        <p className="muted small">{p.desc}</p>
        <div className="tags">
          {p.tags.map(t => <span key={t.label} className={`tag ${t.color}`}>{t.label}</span>)}
        </div>
      </div>
      <div className="project-score">
        <div className={`rank ${p.rankClass}`}>{p.rank}</div>
        <div className="score small">{p.score}</div>
      </div>
    </article>
  );
}

export default function Projects({ projects, onOpen }) {
  const [filter, setFilter] = useState("TOUS");

  const categories = useMemo(() => ["TOUS", ...Array.from(new Set(projects.map(p => p.category)))], [projects]);

  const list = filter === "TOUS" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="hero-card" aria-labelledby="projects-title">
      <h2 id="projects-title">Projets</h2>
      <div className="filters">
        {categories.map(c => (
          <button key={c} className={filter === c ? "active" : ""} onClick={() => setFilter(c)} type="button">{c}</button>
        ))}
      </div>

      <div className="projects-list">
        {list.map(p => <ProjectCard key={p.name} p={p} onOpen={onOpen} />)}
      </div>
    </section>
  );
}