import React, { useEffect } from "react";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Fermer la modale">
          ✕
        </button>

        <div className="modal-header">
          <div className={`modal-icon ${project.wispColor}`}>{project.emoji}</div>
          <div>
            <div className="modal-tag">{project.act}</div>
            <h2>{project.name}</h2>
            <p className="modal-year">{project.year}</p>
          </div>
        </div>

        <div className="modal-body">
          <p className="modal-desc">{project.fullDesc}</p>

          <div className="modal-section">
            <h4>Stack technique</h4>
            <div className="modal-tags">
              {project.tags.map((t) => (
                <span key={t.label} className={`tag ${t.color}`}>
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-stats">
            <div className="stat">
              <div className="stat-val">{project.score}</div>
              <div className="stat-lab">Score</div>
            </div>
            <div className="stat">
              <div className="stat-val">{project.duration}</div>
              <div className="stat-lab">Durée</div>
            </div>
          </div>

          <div className="modal-actions">
            <a className="btn btn-primary" href={project.demo} target="_blank" rel="noreferrer">
              Voir démo
            </a>
            <a className="btn btn-secondary" href={project.repo} target="_blank" rel="noreferrer">
              Code source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}