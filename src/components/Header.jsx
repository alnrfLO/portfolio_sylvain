import React, { useState, useEffect } from "react";

export default function Header({ active, onNavigate, themeLight, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "hero", label: "Accueil", icon: "🏠" },
    { id: "about", label: "Parcours", icon: "📚" },
    { id: "projects", label: "Projets", icon: "💼" },
    { id: "contact", label: "Contact", icon: "✉️" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      {/* Left side - Logo & Brand */}
      <div className="header-left">
        <div className="logo-container">
          <div className="logo-box">
            <span className="logo-text">S</span>
            <div className="logo-glow"></div>
          </div>
        </div>
        <div className="brand-info">
          <div className="brand-name">Sylvain</div>
          <div className="brand-role">Full‑Stack Dev</div>
        </div>
      </div>

      {/* Center - Navigation */}
      <nav className={`header-nav ${isOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-link ${active === item.id ? "active" : ""}`}
            onClick={() => handleNavClick(item.id)}
            type="button"
            aria-current={active === item.id ? "page" : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {active === item.id && <span className="nav-indicator"></span>}
          </button>
        ))}
      </nav>

      {/* Right side - Actions */}
      <div className="header-actions">
        <button
          className={`theme-btn ${themeLight ? "light" : "dark"}`}
          onClick={toggleTheme}
          type="button"
          title="Basculer le thème"
          aria-pressed={themeLight}
        >
          <span className="theme-icon">{themeLight ? "☀️" : "🌙"}</span>
        </button>

        {/* Mobile menu button */}
        <button
          className={`mobile-menu-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="nav-overlay"
          onClick={() => setIsOpen(false)}
          role="presentation"
        ></div>
      )}
    </header>
  );
}