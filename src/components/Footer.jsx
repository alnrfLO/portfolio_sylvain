import React from "react";

export default function Footer({ onTop }) {
  return (
    <footer className="footer">
      <button className="btn btn-secondary" onClick={onTop} type="button">
        ↑ Retour en haut
      </button>
      <p className="footer-text">© 2025 Sylvain Belevindiran. Tous droits réservés.</p>
      <p className="footer-made">Fait avec passion.</p>
    </footer>
  );
}