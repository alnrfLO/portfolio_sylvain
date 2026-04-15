import React, { useEffect } from "react";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true">
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>
        <header>
          <div className={`wisp ${project.wispColor}`}>{project.emoji}</div>
          <div>
            <h3>{project.name}</h3>
            <div className="muted small">{project.act} · {project.year}</div>
          </div>
        </header>
        <section>
          <p>{project.fullDesc}</p>
          <div className="tags" style={{ marginTop: 12 }}>
            {project.tags.map(t => <span key={t.label} className={`tag ${t.color}`}>{t.label}</span>)}
          </div>
          <div className="modal-actions">
            <a className="btn btn-primary" href={project.demo} target="_blank" rel="noreferrer">Voir démo</a>
            <a className="btn btn-outline" href={project.repo} target="_blank" rel="noreferrer">Code source</a>
          </div>
        </section>
      </div>
    </div>
  );
}