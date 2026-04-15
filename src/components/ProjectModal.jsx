import React, { useEffect, useState } from "react";

export default function ProjectModal({ project, onClose }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

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

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

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

        {/* Header */}
        <div className="modal-header">
          <div className={`modal-icon ${project.wispColor}`}>{project.emoji}</div>
          <div className="modal-header-info">
            <div className="modal-tag">{project.act}</div>
            <h2>{project.name}</h2>
            <p className="modal-year">{project.year}</p>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Galerie d'images */}
          <div className="modal-gallery">
            <div className="gallery-main">
              <img
                src={project.images[currentImageIdx]}
                alt={`${project.name} screenshot ${currentImageIdx + 1}`}
                className="gallery-image"
              />
              <button
                className="gallery-arrow gallery-prev"
                onClick={prevImage}
                aria-label="Image précédente"
              >
                ‹
              </button>
              <button
                className="gallery-arrow gallery-next"
                onClick={nextImage}
                aria-label="Image suivante"
              >
                ›
              </button>
              <div className="gallery-counter">
                {currentImageIdx + 1} / {project.images.length}
              </div>
            </div>

            {/* Miniatures */}
            <div className="gallery-thumbs">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb ${idx === currentImageIdx ? "active" : ""}`}
                  onClick={() => setCurrentImageIdx(idx)}
                  aria-label={`Image ${idx + 1}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="modal-section">
            <h3>À propos</h3>
            <p className="modal-desc">{project.fullDesc}</p>
          </div>

          {/* Stack technique */}
          <div className="modal-section">
            <h3>Stack technique</h3>
            <div className="stack-grid">
              {project.tags.map((tag) => (
                <div key={tag.label} className="stack-item">
                  <div className={`stack-badge ${tag.color}`}>{tag.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="modal-stats">
            <div className="stat-item">
              <div className="stat-value">{project.duration}</div>
              <div className="stat-label">Durée</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{project.score}</div>
              <div className="stat-label">Score</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className={i < project.stars ? "star-filled" : "star-empty"}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="stat-label">Qualité</div>
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <a className="btn btn-primary" href={project.demo} target="_blank" rel="noreferrer">
              🌐 Voir démo
            </a>
            <a className="btn btn-secondary" href={project.repo} target="_blank" rel="noreferrer">
              💻 Code source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}