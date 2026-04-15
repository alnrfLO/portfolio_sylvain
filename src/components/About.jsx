import React from "react";

export default function About() {
  return (
    <section id="about" className="hero-card" aria-labelledby="about-title">
      <h2 id="about-title">À propos</h2>
      <p>
        Développeur Full‑Stack basé à Paris. J'attache de l'importance au code propre, à l'architecture et à l'accessibilité.
        J'aime travailler sur des produits robustes, évolutifs et agréables à utiliser.
      </p>

      <div className="two-columns">
        <div>
          <h3>Compétences clés</h3>
          <ul>
            <li>React, Next.js, TypeScript</li>
            <li>Node.js, Express, REST / GraphQL</li>
            <li>Design system & UI/UX</li>
          </ul>
        </div>
        <div>
          <h3>Méthodes</h3>
          <ul>
            <li>Code review & testing</li>
            <li>CI/CD, Docker</li>
            <li>Performance & accessibilité</li>
          </ul>
        </div>
      </div>
    </section>
  );
}