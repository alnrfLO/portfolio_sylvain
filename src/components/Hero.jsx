import React, { useEffect, useState } from "react";
import useTypewriter from "../hooks/useTypewriter";

export default function Hero({ onCTA }) {
  const [animateText, setAnimateText] = useState(false);

  // Typewriter animations
  const greeting = useTypewriter("Bonjour, je suis", 80, 100);
  const name = useTypewriter("Sylvain Belevindiran", 60, greeting.isComplete ? 700 : 999999);
  const subtitle = useTypewriter(
    "Développeur Full‑Stack — React · Node.js · Design",
    40,
    name.isComplete ? 500 : 999999
  );

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
          <span className="typewriter-text">
            {greeting.displayedText}
            <span className={`typewriter-cursor ${greeting.isComplete ? "hidden" : ""}`}></span>
          </span>
        </div>

        <h1 className="hero-name">
          <span className="typewriter-text">
            {name.displayedText}
            <span className={`typewriter-cursor ${name.isComplete ? "hidden" : ""}`}></span>
          </span>
        </h1>

        <p className="hero-subtitle">
          <span className="typewriter-text">
            {subtitle.displayedText}
            <span className={`typewriter-cursor ${subtitle.isComplete ? "hidden" : ""}`}></span>
          </span>
        </p>

        <p className={`hero-description ${subtitle.isComplete ? "show" : ""}`}>
          Je crée des expériences web performantes, accessibles et intuitives.<br />
          Passionné par le code propre et les interfaces soignées.
        </p>

        {/* Boutons CTA */}
        <div className={`hero-ctas ${subtitle.isComplete ? "show" : ""}`}>
          <button className="btn btn-primary" onClick={onCTA} type="button">
            ↓ Voir mes projets
          </button>
          <a className="btn btn-secondary" href="#contact">
            ✉ Me contacter
          </a>
        </div>

        {/* Stats */}
        <div className={`hero-stats ${subtitle.isComplete ? "show" : ""}`}>
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
      <div className={`scroll-hint ${subtitle.isComplete ? "show" : ""}`}>
        <span>Scroll</span>
        <div className="scroll-icon">⬇</div>
      </div>
    </section>
  );
}