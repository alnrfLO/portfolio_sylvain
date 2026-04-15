import React from "react";

export default function Header({ active, onNavigate, themeLight, toggleTheme }) {
  const nav = [
    { id: "hero", label: "ACCUEIL" },
    { id: "about", label: "A PROPOS" },
    { id: "projects", label: "PROJETS" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <header className="header" role="banner">
      <div className="brand" aria-hidden>
        <div className="logo">S</div>
        <div className="title">Sylvain · Portfolio</div>
      </div>

      <nav className="nav" role="navigation" aria-label="Navigation principale">
        {nav.map((n) => (
          <button
            key={n.id}
            className={active === n.id ? "active" : ""}
            onClick={() => onNavigate(n.id)}
            type="button"
            aria-current={active === n.id ? "page" : undefined}
          >
            {n.label}
          </button>
        ))}
      </nav>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          type="button"
          aria-pressed={themeLight}
          title="Basculer le thème"
        >
          {themeLight ? "CLAIR" : "SOMBRE"}
        </button>
      </div>
    </header>
  );
}