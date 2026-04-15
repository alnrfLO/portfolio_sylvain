import React, { useEffect, useRef, useState } from "react";

const SKILLS = [
  { name: "HTML5", logo: "🏗️", color: "skill-orange" },
  { name: "CSS3", logo: "🎨", color: "skill-pink" },
  { name: "JavaScript", logo: "⚡", color: "skill-gold" },
  { name: "TypeScript", logo: "📘", color: "skill-cyan" },
  { name: "React", logo: "⚛️", color: "skill-cyan" },
  { name: "Next.js", logo: "▲", color: "skill-white" },
  { name: "Node.js", logo: "🟢", color: "skill-green" },
  { name: "Express", logo: "🚀", color: "skill-white" },
  { name: "MongoDB", logo: "🍃", color: "skill-green" },
  { name: "PostgreSQL", logo: "🐘", color: "skill-blue" },
  { name: "Git", logo: "🔧", color: "skill-orange" },
  { name: "Figma", logo: "🎯", color: "skill-pink" },
];

const PROFICIENCIES = [
  { name: "HTML / CSS", pct: 92, color: "fill-orange" },
  { name: "JavaScript", pct: 88, color: "fill-gold" },
  { name: "React", pct: 85, color: "fill-cyan" },
  { name: "TypeScript", pct: 78, color: "fill-cyan" },
  { name: "Node.js", pct: 82, color: "fill-green" },
  { name: "UI / UX Design", pct: 80, color: "fill-pink" },
];

export default function Skills() {
  const scrollRef = useRef(null);
  const [visibleProf, setVisibleProf] = useState(false);
  const profRef = useRef(null);

  // Scroll automatique du carousel (boucle infinie)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollSpeed = 1;

    const autoScroll = setInterval(() => {
      scrollPosition += scrollSpeed;

      // Réinitialiser quand on atteint la fin
      if (scrollPosition >= container.scrollWidth - container.clientWidth) {
        scrollPosition = 0;
      }

      container.scrollLeft = scrollPosition;
    }, 30);

    // Arrêter le scroll au survol
    container.addEventListener("mouseenter", () => clearInterval(autoScroll));
    container.addEventListener("mouseleave", () => {
      clearInterval(autoScroll);
      const newInterval = setInterval(() => {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= container.scrollWidth - container.clientWidth) {
          scrollPosition = 0;
        }
        container.scrollLeft = scrollPosition;
      }, 30);
    });

    return () => clearInterval(autoScroll);
  }, []);

  // Animation des barres au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisibleProf(true);
      },
      { threshold: 0.2 }
    );
    if (profRef.current) observer.observe(profRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills">
      <div className="section-header">
        <h2>Compétences</h2>
        <p className="section-subtitle">
          Technologies et outils que je maîtrise
        </p>
      </div>

      {/* Carousel des logos */}
      <div className="skills-carousel-wrapper">
        <div className="carousel-fade carousel-fade-left"></div>
        <div className="carousel-fade carousel-fade-right"></div>

        <div className="skills-carousel" ref={scrollRef}>
          {/* Double les items pour l'effet boucle infinie */}
          {[...SKILLS, ...SKILLS].map((skill, idx) => (
            <div key={idx} className={`skill-card ${skill.color}`}>
              <div className="skill-logo">{skill.logo}</div>
              <div className="skill-name">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Barres de progression */}
      <div className="proficiency-section" ref={profRef}>
        <h3>Niveau de maîtrise</h3>
        <div className="proficiency-grid">
          {PROFICIENCIES.map((prof) => (
            <div key={prof.name} className="proficiency-item">
              <div className="proficiency-header">
                <span className="proficiency-name">{prof.name}</span>
                <span className="proficiency-pct">{prof.pct}%</span>
              </div>
              <div className="proficiency-track">
                <div
                  className={`proficiency-fill ${prof.color}`}
                  style={{ width: visibleProf ? `${prof.pct}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}