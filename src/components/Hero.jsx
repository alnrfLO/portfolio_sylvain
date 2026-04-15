import React from "react";

export default function Hero({ onPrimary }) {
  return (
    <section id="hero" className="hero-card" aria-label="Présentation">
      <div>
        <h1>Sylvain Belevindiran</h1>
        <p className="lead">
          Développeur Full‑Stack — je crée des applications performantes et des interfaces soignées.
        </p>
        <p className="muted">
          Spécialisé React / Node · UI/UX orienté accessibilité et performance.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onPrimary} type="button">Voir mes projets</button>
          <a className="btn btn-outline" href="#contact">Me contacter</a>
        </div>
      </div>

      <aside className="hero-aside" aria-hidden>
        <div className="card small">
          <div className="label">EXPÉRIENCE</div>
          <div className="value">03 ans</div>
        </div>
        <div className="card small">
          <div className="label">PROJETS</div>
          <div className="value">+5</div>
        </div>
      </aside>
    </section>
  );
}