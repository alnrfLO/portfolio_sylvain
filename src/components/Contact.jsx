import React from "react";
import CONTACTS from "../data/contacts";

export default function Contact() {
  return (
    <section id="contact" className="hero-card" aria-labelledby="contact-title">
      <h2 id="contact-title">Contact</h2>
      <div className="contact-grid">
        {CONTACTS.map(c => (
          <div className="contact-card" key={c.label}>
            <div className="contact-icon">{c.icon}</div>
            <div className="contact-label">// {c.label}</div>
            <div className="contact-val">{c.val}</div>
            <a className="contact-link" href={c.link} target="_blank" rel="noreferrer">{c.linkLabel}</a>
          </div>
        ))}
      </div>
    </section>
  );
}