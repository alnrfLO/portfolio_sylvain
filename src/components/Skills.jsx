import React, { useEffect, useRef, useState } from "react";
import SKILLS from "../data/skills";

function SkillBar({ name, pct, color, active }) {
  return (
    <div className="skill">
      <div className="skill-head">
        <span>{name}</span>
        <span>{pct}%</span>
      </div>
      <div className="track" aria-hidden>
        <div className={`fill ${color}`} style={{ width: active ? `${pct}%` : "0%" }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="hero-card" aria-labelledby="skills-title">
      <h2 id="skills-title">Compétences</h2>
      <div className="skills-grid">
        {SKILLS.map((s) => (
          <SkillBar key={s.name} {...s} active={visible} />
        ))}
      </div>
    </section>
  );
}