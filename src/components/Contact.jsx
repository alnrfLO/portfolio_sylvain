import React from "react";
import CONTACTS from "../data/contacts";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section-header">
        <h2>Contact</h2>
        <p className="section-subtitle">Disponible pour discuter de vos projets</p>
      </div>

      <div className="contact-grid">
        {CONTACTS.map((contact) => (
          <div key={contact.label} className="contact-card">
            <span className="contact-icon">{contact.icon}</span>
            <h3>{contact.label}</h3>
            <p>{contact.val}</p>
            <a className="contact-link" href={contact.link} target="_blank" rel="noreferrer">
              {contact.linkLabel}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}