import React, { useEffect, useState } from "react";

export default function Hero({ onCTA }) {
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    setAnimateText(true);
  }, []);

  return (
    <section id="hero" className="hero">
      {/* Éléments de fond animés */}
      <div className="hero-bg">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      {/* Contenu principal */}
      <div className="hero-wrapper">
        <div className={`hero-greeting ${animateText ? "animate" : ""}`}>
          Bonjour, je suis
        </div>

        <h1 className={`hero-name ${animateText ? "animate" : ""}`}>
          Sylvain Belevindiran
        </h1>

        <p className={`hero-subtitle ${animateText ? "animate" : ""}`}>
          Développeur Full‑Stack — React · Node.js · Design
        </p>

        <p className={`hero-description ${animateText ? "animate" : ""}`}>
          Je crée des expériences web performantes, accessibles et intuitives.<br />
          Passionné par le code propre et les interfaces soignées.
        </p>

        {/* Boutons CTA */}
        <div className={`hero-ctas ${animateText ? "animate" : ""}`}>
          <button className="btn btn-primary" onClick={onCTA} type="button">
            ↓ Voir mes projets
          </button>
          <a className="btn btn-secondary" href="#contact">
            ✉ Me contacter
          </a>
        </div>

        {/* Stats */}
        <div className={`hero-stats ${animateText ? "animate" : ""}`}>
          <div className="hero-stat">
            <div className="stat-number">03</div>
            <div className="stat-text">ans d'expérience</div>
          </div>
          <div className="hero-divider"></div>
          <div className="hero-stat">
            <div className="stat-number">5+</div>
            <div className="stat-text">projets livrés</div>
          </div>
          <div className="hero-divider"></div>
          <div className="hero-stat">
            <div className="stat-number">100%</div>
            <div className="stat-text">satisfaction</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`scroll-hint ${animateText ? "animate" : ""}`}>
        <span>Scroll</span>
        <div className="scroll-icon">⬇</div>
      </div>
    </section>
  );
}