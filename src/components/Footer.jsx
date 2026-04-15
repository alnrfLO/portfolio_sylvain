import React from "react";

export default function Footer({ onTop }) {
  return (
    <footer className="footer">
      <div className="footer-left">
        <button className="btn btn-outline" onClick={onTop} type="button">TOP</button>
      </div>
      <div className="footer-center">© Sylvain · 2025</div>
      <div className="footer-right">Made with <span style={{color:"var(--gold)"}}>★</span></div>
    </footer>
  );
}