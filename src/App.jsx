import { useState, useEffect, useRef } from "react";

const GOLD = "#ffd700";
const CYAN = "#00e5ff";
const PINK = "#ff66cc";
const ORANGE = "#ff9900";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --gold: #ffd700;
  --cyan: #00e5ff;
  --pink: #ff66cc;
  --orange: #ff9900;
  --green: #00ee88;
  --purple: #aa44ff;
  --orb: 'Orbitron', monospace;
  --raj: 'Rajdhani', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  background: #000;
  font-family: var(--raj);
  color: #fff;
  overflow-x: hidden;
}

/* ── STARS ── */
.stars-layer {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    radial-gradient(1px 1px at 5% 10%, rgba(255,255,255,.9), transparent),
    radial-gradient(1px 1px at 15% 3%, rgba(255,255,255,.6), transparent),
    radial-gradient(1px 1px at 28% 18%, rgba(255,255,255,.7), transparent),
    radial-gradient(1px 1px at 45% 7%, rgba(255,255,255,.5), transparent),
    radial-gradient(1px 1px at 60% 14%, rgba(255,255,255,.8), transparent),
    radial-gradient(1px 1px at 75% 4%, rgba(255,255,255,.6), transparent),
    radial-gradient(1px 1px at 88% 22%, rgba(255,255,255,.7), transparent),
    radial-gradient(1px 1px at 8% 40%, rgba(255,255,255,.5), transparent),
    radial-gradient(1px 1px at 22% 52%, rgba(255,255,255,.6), transparent),
    radial-gradient(1px 1px at 38% 46%, rgba(255,255,255,.4), transparent),
    radial-gradient(1px 1px at 55% 62%, rgba(255,255,255,.7), transparent),
    radial-gradient(1px 1px at 70% 35%, rgba(255,255,255,.5), transparent),
    radial-gradient(1px 1px at 82% 68%, rgba(255,255,255,.6), transparent),
    radial-gradient(1px 1px at 12% 75%, rgba(255,255,255,.4), transparent),
    radial-gradient(1px 1px at 48% 82%, rgba(255,255,255,.5), transparent),
    radial-gradient(1px 1px at 91% 48%, rgba(255,255,255,.6), transparent),
    radial-gradient(1px 1px at 33% 88%, rgba(180,220,255,.4), transparent),
    radial-gradient(2px 2px at 65% 90%, rgba(180,220,255,.3), transparent),
    radial-gradient(1px 1px at 93% 78%, rgba(255,255,255,.5), transparent),
    radial-gradient(1px 1px at 20% 95%, rgba(255,255,255,.4), transparent),
    radial-gradient(1px 1px at 77% 58%, rgba(255,220,50,.3), transparent),
    radial-gradient(1px 1px at 42% 30%, rgba(255,220,50,.2), transparent);
}

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(0,0,0,.85);
  border-bottom: 1px solid rgba(255,220,50,.25);
  backdrop-filter: blur(10px);
  padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
  height: 52px;
}
.nav::after {
  content: '';
  position: absolute; bottom: -1px; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyan), rgba(255,255,255,.6), var(--gold), transparent);
}
.nav-logo {
  font-family: var(--orb); font-weight: 900; font-size: 14px;
  color: var(--gold); -webkit-text-stroke: .5px #cc6600;
  text-shadow: 0 0 16px rgba(255,200,0,.4);
  letter-spacing: 2px;
}
.nav-links { display: flex; gap: 4px; }
.nav-link {
  font-family: var(--orb); font-size: 8px; font-weight: 700;
  letter-spacing: 1.5px; color: rgba(200,230,255,.6);
  padding: 6px 12px; border-radius: 20px;
  background: transparent; border: none; cursor: pointer;
  transition: all .2s;
}
.nav-link:hover, .nav-link.active {
  color: var(--cyan); background: rgba(0,220,255,.1);
}
.nav-badge {
  font-family: var(--orb); font-size: 7px; color: rgba(200,220,255,.4);
  letter-spacing: 2px;
  animation: blink 1.4s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:.4} 50%{opacity:1} }

/* ── SECTIONS ── */
section { position: relative; z-index: 1; }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: radial-gradient(ellipse at 50% 60%, #0a0a2e 0%, #050510 55%, #000 100%);
  padding: 80px 24px 60px;
  text-align: center;
  overflow: hidden;
}
.hero-glow {
  position: absolute; bottom: -100px; left: 50%; transform: translateX(-50%);
  width: 600px; height: 300px;
  background: radial-gradient(ellipse at 50% 100%, rgba(100,0,180,.2), transparent 70%);
  pointer-events: none;
}
.hero-badge {
  font-family: var(--orb); font-size: 9px; font-weight: 700;
  letter-spacing: 4px; color: rgba(0,200,255,.7);
  border: 1px solid rgba(0,200,255,.3); border-radius: 20px;
  padding: 5px 16px; margin-bottom: 20px;
  display: inline-block;
}
.hero-title {
  font-family: var(--orb); font-weight: 900;
  font-size: clamp(32px, 7vw, 72px);
  color: var(--gold); -webkit-text-stroke: 2px #cc6600;
  text-shadow: 0 0 30px rgba(255,200,0,.4), 4px 4px 0 rgba(0,0,0,.8);
  letter-spacing: 4px; line-height: 1.1;
  margin-bottom: 12px;
}
.hero-title-sub {
  font-family: var(--orb); font-weight: 900;
  font-size: clamp(18px, 3.5vw, 36px);
  color: var(--cyan); -webkit-text-stroke: 1px #006699;
  text-shadow: 0 0 20px rgba(0,220,255,.4), 2px 2px 0 rgba(0,0,0,.8);
  letter-spacing: 6px; line-height: 1.1;
  margin-bottom: 20px;
}
.hero-subtitle {
  font-family: var(--orb); font-size: clamp(11px, 1.8vw, 16px);
  color: var(--cyan); letter-spacing: 3px; margin-bottom: 24px;
}
.hero-stars { color: var(--gold); font-size: 18px; letter-spacing: 4px; margin-bottom: 32px; }
.hero-desc {
  max-width: 560px; font-size: 16px; line-height: 1.7;
  color: rgba(180,210,255,.75); margin-bottom: 40px;
}
.hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.btn-primary {
  font-family: var(--orb); font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
  padding: 12px 28px; border-radius: 8px; cursor: pointer;
  background: linear-gradient(180deg, #00e5ff 0%, #0099cc 50%, #006699 100%);
  border: none; color: #fff;
  box-shadow: 0 0 20px rgba(0,220,255,.5), 0 4px 0 #004466, inset 0 1px 0 rgba(255,255,255,.4);
  position: relative; overflow: hidden; transition: all .15s;
}
.btn-primary::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 45%;
  background: linear-gradient(to bottom, rgba(255,255,255,.3), transparent);
  border-radius: 8px 8px 50% 50%;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 28px rgba(0,220,255,.7), 0 6px 0 #004466; }
.btn-secondary {
  font-family: var(--orb); font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
  padding: 12px 28px; border-radius: 8px; cursor: pointer;
  background: transparent; border: 2px solid rgba(255,215,0,.5); color: var(--gold);
  transition: all .15s;
}
.btn-secondary:hover { border-color: var(--gold); background: rgba(255,215,0,.08); transform: translateY(-2px); }

.hero-hud {
  position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 32px; align-items: center;
}
.hud-item { text-align: center; }
.hud-val { font-family: var(--orb); font-size: 18px; font-weight: 900; color: var(--gold); }
.hud-label { font-family: var(--orb); font-size: 7px; color: rgba(0,200,255,.6); letter-spacing: 2px; margin-top: 2px; }
.hud-sep { width: 1px; height: 32px; background: rgba(255,215,0,.2); }

/* ── ABOUT ── */
.about {
  padding: 100px 24px;
  background: radial-gradient(ellipse at 30% 50%, #0a0a2e 0%, #020208 60%, #000 100%);
}
.section-header {
  text-align: center; margin-bottom: 60px;
}
.section-num {
  font-family: var(--orb); font-size: 9px; color: rgba(0,200,255,.6); letter-spacing: 4px;
  display: block; margin-bottom: 8px;
}
.section-title {
  font-family: var(--orb); font-weight: 900; font-size: clamp(24px, 5vw, 42px);
  color: var(--gold); -webkit-text-stroke: 1px #cc6600;
  text-shadow: 0 0 20px rgba(255,200,0,.3); letter-spacing: 3px;
}
.section-line {
  width: 120px; height: 2px; margin: 16px auto 0;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.about-grid {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
}
@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; } }

.about-card {
  background: rgba(0,10,40,.6);
  border: 1px solid rgba(255,220,50,.15);
  border-radius: 12px; padding: 24px;
  position: relative; overflow: hidden;
  transition: all .2s;
}
.about-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,215,0,.4), transparent);
}
.about-card:hover { border-color: rgba(255,215,0,.35); transform: translateY(-3px); }

.about-card-title {
  font-family: var(--orb); font-size: 10px; font-weight: 700;
  color: var(--cyan); letter-spacing: 2px; margin-bottom: 16px;
}
.about-card-body { font-size: 15px; line-height: 1.7; color: rgba(180,210,255,.8); }

.stat-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0; border-bottom: 1px solid rgba(255,215,0,.08);
}
.stat-label { font-family: var(--orb); font-size: 9px; color: rgba(255,220,100,.7); letter-spacing: 1px; }
.stat-val { font-family: var(--orb); font-size: 14px; font-weight: 900; color: var(--gold); text-shadow: 0 0 8px rgba(255,215,0,.4); }
.stat-val.cyan { color: var(--cyan); text-shadow: 0 0 8px rgba(0,220,255,.4); }
.stat-val.green { color: #00ee88; }
.stat-divider { height: 2px; margin: 12px 0; background: linear-gradient(90deg, rgba(255,200,50,.3), rgba(255,215,0,.7), rgba(255,200,50,.3)); border-radius: 1px; }

.tags-wrap { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.tag {
  font-family: var(--orb); font-size: 8px; font-weight: 700;
  padding: 4px 12px; border-radius: 20px; letter-spacing: 1px;
}
.tag-cyan  { background: rgba(0,200,255,.15); color: var(--cyan); border: 1px solid rgba(0,200,255,.3); }
.tag-gold  { background: rgba(255,215,0,.12); color: var(--gold); border: 1px solid rgba(255,215,0,.3); }
.tag-pink  { background: rgba(255,100,200,.12); color: var(--pink); border: 1px solid rgba(255,100,200,.3); }
.tag-green { background: rgba(0,230,130,.12); color: #00ee88; border: 1px solid rgba(0,200,120,.3); }

/* ── SKILLS BAR ── */
.skills-section {
  padding: 80px 24px;
  background: #000;
}
.skills-grid {
  max-width: 900px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px 48px;
}
@media (max-width: 600px) { .skills-grid { grid-template-columns: 1fr; } }

.skill-item { margin-bottom: 4px; }
.skill-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.skill-name { font-family: var(--orb); font-size: 9px; font-weight: 700; letter-spacing: 1.5px; color: rgba(200,230,255,.8); }
.skill-pct { font-family: var(--orb); font-size: 9px; font-weight: 700; color: var(--gold); }
.skill-track {
  height: 6px; background: rgba(255,255,255,.08); border-radius: 3px; overflow: hidden;
  position: relative;
}
.skill-fill {
  height: 100%; border-radius: 3px;
  position: relative; transition: width 1.2s cubic-bezier(.4,0,.2,1);
}
.skill-fill::after {
  content: ''; position: absolute; right: 0; top: 0; width: 4px; height: 100%;
  background: rgba(255,255,255,.6); border-radius: 2px;
}
.sf-cyan   { background: linear-gradient(90deg, #0055cc, var(--cyan)); box-shadow: 0 0 8px rgba(0,200,255,.4); }
.sf-gold   { background: linear-gradient(90deg, #cc6600, var(--gold)); box-shadow: 0 0 8px rgba(255,200,0,.4); }
.sf-pink   { background: linear-gradient(90deg, #880066, var(--pink)); box-shadow: 0 0 8px rgba(255,80,200,.4); }
.sf-green  { background: linear-gradient(90deg, #005533, #00ee88); box-shadow: 0 0 8px rgba(0,200,130,.4); }

/* ── PROJECTS ── */
.projects {
  padding: 100px 24px;
  background: radial-gradient(ellipse at 70% 30%, #001240 0%, #020210 60%, #000 100%);
}
.sc-world-bar {
  max-width: 900px; margin: 0 auto 32px;
  display: flex; gap: 8px; flex-wrap: wrap;
}
.sc-world-btn {
  font-family: var(--orb); font-size: 9px; font-weight: 700; letter-spacing: 1px;
  padding: 6px 16px; border-radius: 20px; cursor: pointer;
  background: rgba(0,20,80,.6); border: 1px solid rgba(255,255,255,.2);
  color: rgba(200,220,255,.6); transition: all .15s;
}
.sc-world-btn:hover { border-color: rgba(255,215,0,.5); color: var(--gold); }
.sc-world-btn.active {
  background: linear-gradient(135deg, rgba(255,215,0,.2), rgba(255,150,0,.1));
  border-color: var(--gold); color: var(--gold);
  box-shadow: 0 0 12px rgba(255,200,0,.2);
}

.projects-grid {
  max-width: 900px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 12px;
}

.project-card {
  display: flex; align-items: center; gap: 16px; padding: 16px;
  background: rgba(0,20,80,.65); border: 2px solid rgba(255,255,255,.18);
  border-radius: 12px; cursor: pointer; position: relative; overflow: hidden;
  transition: all .2s;
}
.project-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent);
}
.project-card::after {
  content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.06), transparent);
  transform: skewX(-20deg);
  animation: shine 5s ease-in-out infinite;
}
@keyframes shine { 0%,100%{left:-60%} 50%{left:120%} }
.project-card:hover {
  transform: translateY(-3px) scale(1.005);
  border-color: rgba(255,215,0,.6);
  box-shadow: 0 8px 24px rgba(0,0,0,.5), 0 0 16px rgba(255,215,0,.2);
  background: rgba(0,40,120,.75);
}
.project-card.selected {
  border-color: var(--gold);
  box-shadow: 0 0 0 2px var(--gold), 0 8px 24px rgba(255,215,0,.25);
}

.card-act {
  font-family: var(--orb); font-size: 8px; font-weight: 900;
  writing-mode: vertical-rl; transform: rotate(180deg);
  letter-spacing: 2px; flex-shrink: 0;
}
.act-cyan   { color: #00eeff; text-shadow: 0 0 8px #00ccff; }
.act-orange { color: var(--orange); text-shadow: 0 0 8px #ff6600; }
.act-pink   { color: var(--pink); text-shadow: 0 0 8px #ff44aa; }

.card-wisp {
  width: 54px; height: 54px; flex-shrink: 0; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 24px;
  border: 2px solid rgba(255,255,255,.25); position: relative; overflow: hidden;
}
.wisp-cyan   { background: radial-gradient(circle at 35% 35%, #66ffff, #0088cc); box-shadow: 0 0 14px rgba(0,200,255,.5); }
.wisp-orange { background: radial-gradient(circle at 35% 35%, #ffcc44, #ff6600); box-shadow: 0 0 14px rgba(255,140,0,.5); }
.wisp-pink   { background: radial-gradient(circle at 35% 35%, #ffaaee, #cc0088); box-shadow: 0 0 14px rgba(255,80,180,.5); }

.card-info { flex: 1; min-width: 0; }
.card-name {
  font-family: var(--orb); font-size: 14px; font-weight: 900;
  color: #fff; letter-spacing: 1px; margin-bottom: 4px;
  text-shadow: 0 1px 0 #003399;
}
.card-desc {
  font-size: 12px; color: rgba(180,210,255,.65); line-height: 1.4; margin-bottom: 8px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.card-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.sc-tag {
  font-family: var(--orb); font-size: 7px; font-weight: 700;
  padding: 2px 10px; border-radius: 20px;
}
.sc-tag-cyan   { color: #003399; background: #00eeff; }
.sc-tag-orange { color: #330000; background: #ff9900; }
.sc-tag-pink   { color: #330033; background: #ff66cc; }
.sc-tag-white  { color: #003399; background: #ffffff; }
.sc-tag-green  { color: #003310; background: #00ee88; }

.card-score { flex-shrink: 0; text-align: center; }
.rank-badge {
  font-family: var(--orb); font-size: 20px; font-weight: 900;
  width: 36px; height: 36px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 4px;
}
.rank-s {
  background: linear-gradient(135deg, #ffd700, #ff8c00);
  color: #fff; text-shadow: 0 1px 0 rgba(0,0,0,.4);
  box-shadow: 0 0 12px rgba(255,200,0,.6);
}
.rank-a {
  background: linear-gradient(135deg, #00ccff, #0055cc);
  color: #fff;
  box-shadow: 0 0 10px rgba(0,200,255,.5);
}
.rank-b {
  background: linear-gradient(135deg, #00ee88, #007744);
  color: #fff;
  box-shadow: 0 0 10px rgba(0,200,130,.5);
}
.card-score-val { font-family: var(--orb); font-size: 7px; font-weight: 700; color: rgba(255,215,0,.7); }

.card-stars { flex-shrink: 0; display: flex; flex-direction: column; gap: 2px; }
.star-lit { color: var(--gold); font-size: 12px; text-shadow: 0 0 6px var(--gold); }
.star-dim { color: rgba(255,255,255,.2); font-size: 12px; }

/* ── CONTACT ── */
.contact {
  padding: 100px 24px;
  background: radial-gradient(ellipse at 50% 80%, #0a0a2e 0%, #030310 60%, #000 100%);
}
.contact-grid {
  max-width: 900px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;
}
@media (max-width: 700px) { .contact-grid { grid-template-columns: 1fr; } }

.contact-card {
  background: rgba(0,10,40,.6); border: 1px solid rgba(255,220,50,.15);
  border-radius: 12px; padding: 24px;
  position: relative; overflow: hidden; transition: all .2s;
  text-align: center;
}
.contact-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,215,0,.4), transparent);
}
.contact-card:hover { border-color: rgba(0,200,255,.35); transform: translateY(-3px); }
.contact-icon { font-size: 32px; margin-bottom: 12px; display: block; }
.contact-label {
  font-family: var(--orb); font-size: 9px; font-weight: 700;
  color: var(--cyan); letter-spacing: 2px; margin-bottom: 10px;
}
.contact-val {
  font-size: 14px; color: rgba(200,230,255,.8); line-height: 1.6;
  word-break: break-all;
}
.contact-link {
  display: inline-block; margin-top: 8px;
  font-family: var(--orb); font-size: 8px; letter-spacing: 1px;
  padding: 5px 14px; border-radius: 20px;
  background: rgba(0,200,255,.1); border: 1px solid rgba(0,200,255,.3); color: var(--cyan);
  text-decoration: none; transition: all .15s;
}
.contact-link:hover { background: rgba(0,200,255,.2); }

/* ── FOOTER ── */
footer {
  position: relative; z-index: 1;
  background: #000; border-top: 2px solid rgba(0,150,255,.3);
  padding: 20px 24px;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
}
footer::before {
  content: ''; position: absolute; top: -2px; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #00ccff, #fff, #ffd700, #ff6600, #ffd700, #fff, #00ccff);
}
.footer-left { display: flex; align-items: center; gap: 10px; }
.btn-b {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 14px 6px 8px;
  background: linear-gradient(135deg, #990000, #660000);
  border: 2px solid #ff3333; border-radius: 20px; cursor: pointer;
  box-shadow: 0 3px 0 #330000, 0 0 8px rgba(255,0,0,.3); transition: transform .1s;
}
.btn-b:hover { transform: translateY(-2px); }
.b-circle {
  width: 18px; height: 18px; border-radius: 50%;
  background: #fff; color: #990000;
  font-family: var(--orb); font-size: 10px; font-weight: 900;
  display: inline-flex; align-items: center; justify-content: center;
}
.b-label { font-family: var(--orb); font-size: 9px; font-weight: 700; color: #fff; letter-spacing: 1px; }
.footer-mid {
  font-family: var(--orb); font-size: 8px; color: rgba(200,230,255,.4); letter-spacing: 3px;
  animation: blink 1.2s ease-in-out infinite;
}
.note-badge { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.note-circle {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, #00aaff, #0055cc);
  border: 2px solid var(--cyan);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--orb); font-size: 16px; font-weight: 900; color: #fff;
  box-shadow: 0 0 12px rgba(0,180,255,.5);
}
.note-label { font-family: var(--orb); font-size: 6px; color: rgba(0,200,255,.6); letter-spacing: 2px; }

/* ── SCROLL REVEAL ── */
.reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ── RINGS COUNTER ── */
.rings-hud {
  display: flex; align-items: center; gap: 8px; margin-left: auto; margin-right: 24px;
}
.ring-icon { color: var(--gold); font-size: 16px; animation: spin 3s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.ring-num { font-family: var(--orb); font-size: 18px; font-weight: 900; color: var(--gold); text-shadow: 0 0 10px rgba(255,200,0,.5); min-width: 32px; }
.ring-label { font-family: var(--orb); font-size: 7px; color: rgba(255,200,0,.6); letter-spacing: 2px; }

/* ── DIVIDER ── */
.sc-divider {
  height: 3px;
  background: linear-gradient(90deg, #00ccff, #fff, #ffd700, #ff6600, #ffd700, #fff, #00ccff);
}
`;

const SKILLS = [
  { name: "HTML / CSS", pct: 92, color: "sf-cyan" },
  { name: "JavaScript", pct: 88, color: "sf-gold" },
  { name: "React", pct: 85, color: "sf-cyan" },
  { name: "Node.js", pct: 78, color: "sf-green" },
  { name: "UI / UX Design", pct: 80, color: "sf-pink" },
  { name: "TypeScript", pct: 70, color: "sf-cyan" },
  { name: "Git / DevOps", pct: 82, color: "sf-gold" },
  { name: "Figma", pct: 74, color: "sf-pink" },
];

const PROJECTS = [
  {
    act: "ACT 1", actColor: "act-cyan", wispColor: "wisp-cyan", emoji: "💠",
    name: "STELLAR SHOP", desc: "E-commerce full-stack avec animations 3D et panier temps réel",
    tags: [{ label: "REACT", color: "sc-tag-cyan" }, { label: "NODE", color: "sc-tag-white" }, { label: "STRIPE", color: "sc-tag-green" }],
    rank: "S", rankClass: "rank-s", score: "99,999", stars: 3,
    category: "WEB"
  },
  {
    act: "ACT 2", actColor: "act-orange", wispColor: "wisp-orange", emoji: "🔥",
    name: "PIXEL DASHBOARD", desc: "Dashboard analytics avec graphiques interactifs et dark mode",
    tags: [{ label: "REACT", color: "sc-tag-orange" }, { label: "D3.JS", color: "sc-tag-white" }, { label: "REST API", color: "sc-tag-orange" }],
    rank: "S", rankClass: "rank-s", score: "98,450", stars: 3,
    category: "APP"
  },
  {
    act: "ACT 3", actColor: "act-pink", wispColor: "wisp-pink", emoji: "🌸",
    name: "NEON PORTFOLIO", desc: "Portfolio designer avec transitions CSS avancées et scroll parallax",
    tags: [{ label: "HTML", color: "sc-tag-pink" }, { label: "GSAP", color: "sc-tag-white" }, { label: "CSS3", color: "sc-tag-pink" }],
    rank: "A", rankClass: "rank-a", score: "87,200", stars: 3,
    category: "DESIGN"
  },
  {
    act: "ACT 4", actColor: "act-cyan", wispColor: "wisp-cyan", emoji: "🤖",
    name: "AI CHAT UI", desc: "Interface de chat IA avec streaming tokens et historique persistant",
    tags: [{ label: "NEXT.JS", color: "sc-tag-cyan" }, { label: "OPENAI", color: "sc-tag-white" }, { label: "TS", color: "sc-tag-green" }],
    rank: "A", rankClass: "rank-a", score: "82,750", stars: 2,
    category: "APP"
  },
  {
    act: "ACT 5", actColor: "act-orange", wispColor: "wisp-orange", emoji: "🎮",
    name: "GAME HUB", desc: "Plateforme de mini-jeux browser avec leaderboard et profils utilisateurs",
    tags: [{ label: "REACT", color: "sc-tag-orange" }, { label: "SOCKET.IO", color: "sc-tag-white" }, { label: "MONGO", color: "sc-tag-green" }],
    rank: "B", rankClass: "rank-b", score: "74,100", stars: 2,
    category: "WEB"
  },
];

const CONTACTS = [
  { icon: "✉️", label: "EMAIL", val: "sylvain.belevindiran@gmail.com", link: "mailto:sylvain.belevindiran@gmail.com", linkLabel: "ENVOYER →" },
  { icon: "💻", label: "GITHUB", val: "github.com/sylvain-bvd", link: "https://github.com", linkLabel: "VOIR REPOS →" },
  { icon: "🔗", label: "LINKEDIN", val: "linkedin.com/in/sylvain-bvd", link: "https://linkedin.com", linkLabel: "SE CONNECTER →" },
];

function SkillBar({ name, pct, color, animate }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div className={`skill-fill ${color}`} style={{ width: animate ? `${pct}%` : "0%" }} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("TOUS");
  const [rings, setRings] = useState(0);
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const skillsRef = useRef(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = styles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    let v = 0;
    const iv = setInterval(() => {
      if (v < 50) { v++; setRings(v); }
      else clearInterval(iv);
    }, 60);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            const id = e.target.dataset.section;
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!skillsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSkillsAnimated(true); },
      { threshold: 0.3 }
    );
    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const addRevealRef = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const filteredProjects = activeFilter === "TOUS"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const handleProjectClick = (i) => {
    setSelectedProject(selectedProject === i ? null : i);
    setRings(r => Math.min(r + Math.floor(Math.random() * 15 + 5), 99));
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="stars-layer" />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">S<span style={{ color: "#00e5ff", WebkitTextStroke: "none" }}>.</span>BVD</div>
        <div className="nav-links">
          {["hero","about","projects","contact"].map(s => (
            <button key={s} className={`nav-link ${activeSection === s ? "active" : ""}`}
              onClick={() => scrollTo(s)}>
              {s === "hero" ? "HOME" : s === "about" ? "PROFIL" : s === "projects" ? "PROJETS" : "CONTACT"}
            </button>
          ))}
        </div>
        <div className="rings-hud">
          <span className="ring-icon">◎</span>
          <span className="ring-num">{String(rings).padStart(2,"0")}</span>
          <span className="ring-label">RINGS</span>
        </div>
        <div className="nav-badge">★★★★★</div>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero" data-section="hero"
        ref={el => { if (el) { addRevealRef(el); el.dataset.section = "hero"; }}}>
        <div className="hero-glow" />
        <div className="hero-badge">★ PLAYER SELECT · STAGE 01</div>
        <h1 className="hero-title">SYLVAIN</h1>
        <div className="hero-title-sub">BELEVINDIRAN</div>
        <div className="hero-subtitle">DÉVELOPPEUR FULL-STACK · LEVEL MAX</div>
        <div className="hero-stars">★★★★★</div>
        <p className="hero-desc">
          Passionné par le code et le design, je crée des expériences digitales
          qui font la différence. Chaque projet est une nouvelle quête à maîtriser.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo("projects")}>⚡ VOIR MES PROJETS</button>
          <button className="btn-secondary" onClick={() => scrollTo("contact")}>✉ ME CONTACTER</button>
        </div>
        <div className="hero-hud">
          <div className="hud-item">
            <div className="hud-val">03</div>
            <div className="hud-label">ANS XP</div>
          </div>
          <div className="hud-sep" />
          <div className="hud-item">
            <div className="hud-val" style={{ color: "#00e5ff" }}>5+</div>
            <div className="hud-label">PROJETS</div>
          </div>
          <div className="hud-sep" />
          <div className="hud-item">
            <div className="hud-val" style={{ color: "#00ee88" }}>100%</div>
            <div className="hud-label">MOTIVÉ</div>
          </div>
        </div>
      </section>

      <div className="sc-divider" />

      {/* ABOUT */}
      <section id="about" className="about">
        <div ref={el => { addRevealRef(el); if (el) el.dataset.section = "about"; }} className="reveal section-header">
          <span className="section-num">PAGE 01 · PROFIL</span>
          <h2 className="section-title">À PROPOS</h2>
          <div className="section-line" />
        </div>
        <div className="about-grid reveal" ref={addRevealRef}>
          <div className="about-card">
            <div className="about-card-title">// QUI SUIS-JE</div>
            <p className="about-card-body">
              Développeur Full-Stack basé à Paris, je transforme des idées en interfaces performantes et mémorables.
              Passionné par les nouvelles technologies, le game design et l'expérience utilisateur,
              je pousse chaque projet au <span style={{ color: GOLD, fontWeight: 700 }}>NIVEAU MAX</span>.
            </p>
            <div className="tags-wrap" style={{ marginTop: 20 }}>
              <span className="tag tag-cyan">OPEN TO WORK</span>
              <span className="tag tag-gold">FREELANCE OK</span>
              <span className="tag tag-pink">FULL REMOTE</span>
            </div>
          </div>
          <div className="about-card">
            <div className="about-card-title">// STATS JOUEUR</div>
            <div className="stat-row">
              <span className="stat-label">IDENTITÉ</span>
              <span className="stat-val" style={{ color: "#fff", fontSize: 12 }}>SYLVAIN BELEVINDIRAN</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">ROLE</span>
              <span className="stat-val cyan">DEV FULL-STACK</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">LOCALISATION</span>
              <span className="stat-val">PARIS, FR 🗼</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">SPÉCIALITÉ</span>
              <span className="stat-val">HTML · CSS · JS</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">FRAMEWORKS</span>
              <span className="stat-val green">REACT · NODE</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">EXPÉRIENCE</span>
              <span className="stat-val">03 ANS</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-row">
              <span className="stat-label" style={{ color: "#fff", fontSize: 11 }}>TOTAL POWER</span>
              <span className="stat-val" style={{ fontSize: 20 }}>NIVEAU MAX</span>
            </div>
          </div>
          <div className="about-card" style={{ gridColumn: "1/-1" }}>
            <div className="about-card-title">// TECHNOLOGIES</div>
            <div className="tags-wrap">
              {["HTML5","CSS3","JavaScript","TypeScript","React","Next.js","Node.js","Express",
                "MongoDB","PostgreSQL","Git","Figma","REST API","Docker"].map((t,i) => (
                <span key={t} className={`tag ${i%3===0?"tag-cyan":i%3===1?"tag-gold":"tag-pink"}`}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sc-divider" />

      {/* SKILLS */}
      <section id="skills" className="skills-section" ref={skillsRef}>
        <div className="reveal section-header" ref={addRevealRef}>
          <span className="section-num">PAGE 02 · COMPÉTENCES</span>
          <h2 className="section-title">SKILLS</h2>
          <div className="section-line" />
        </div>
        <div className="skills-grid reveal" ref={addRevealRef}>
          {SKILLS.map((s) => (
            <SkillBar key={s.name} {...s} animate={skillsAnimated} />
          ))}
        </div>
      </section>

      <div className="sc-divider" />

      {/* PROJECTS */}
      <section id="projects" className="projects">
        <div className="reveal section-header" ref={el => { addRevealRef(el); if (el) el.dataset.section = "projects"; }}>
          <span className="section-num">PAGE 03 · STAGE SELECT</span>
          <h2 className="section-title">MES PROJETS</h2>
          <div className="section-line" />
        </div>
        <div className="sc-world-bar reveal" ref={addRevealRef}>
          {["TOUS","WEB","APP","DESIGN"].map(f => (
            <span key={f} className={`sc-world-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}>
              {f === "TOUS" ? "★ TOUS" : f}
            </span>
          ))}
        </div>
        <div className="projects-grid">
          {filteredProjects.map((p, i) => (
            <div key={p.name}
              className={`project-card reveal ${selectedProject === i ? "selected" : ""}`}
              ref={addRevealRef}
              onClick={() => handleProjectClick(i)}
              style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className={`card-act ${p.actColor}`}>{p.act}</div>
              <div className={`card-wisp ${p.wispColor}`}>{p.emoji}</div>
              <div className="card-info">
                <div className="card-name">{p.name}</div>
                <div className="card-desc">{p.desc}</div>
                <div className="card-tags">
                  {p.tags.map(t => <span key={t.label} className={`sc-tag ${t.color}`}>{t.label}</span>)}
                </div>
              </div>
              <div className="card-score">
                <div className={`rank-badge ${p.rankClass}`}>{p.rank}</div>
                <div className="card-score-val">{p.score}</div>
              </div>
              <div className="card-stars">
                {[0,1,2].map(s => <span key={s} className={s < p.stars ? "star-lit" : "star-dim"}>★</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="sc-divider" />

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="reveal section-header" ref={el => { addRevealRef(el); if (el) el.dataset.section = "contact"; }}>
          <span className="section-num">PAGE 04 · COMMUNICATION</span>
          <h2 className="section-title">CONTACT</h2>
          <div className="section-line" />
        </div>
        <div className="contact-grid reveal" ref={addRevealRef}>
          {CONTACTS.map((c) => (
            <div key={c.label} className="contact-card">
              <span className="contact-icon">{c.icon}</span>
              <div className="contact-label">// {c.label}</div>
              <div className="contact-val">{c.val}</div>
              <a className="contact-link" href={c.link}>{c.linkLabel}</a>
            </div>
          ))}
        </div>
        <div className="reveal" ref={addRevealRef} style={{ maxWidth: 900, margin: "32px auto 0", textAlign: "center" }}>
          <div className="about-card" style={{ display: "inline-block", maxWidth: 560, padding: "20px 32px" }}>
            <div className="about-card-title" style={{ marginBottom: 10 }}>// MESSAGE DIRECT</div>
            <p className="about-card-body" style={{ fontSize: 14 }}>
              Disponible pour tout projet, collaboration ou opportunité.
              Réponse garantie sous <span style={{ color: CYAN, fontWeight: 700 }}>48h</span>. Let's build something epic! 🚀
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-left">
          <button className="btn-b" onClick={() => scrollTo("hero")}>
            <span className="b-circle">↑</span>
            <span className="b-label">TOP</span>
          </button>
        </div>
        <div className="footer-mid">PRESS START TO SKIP · 2025</div>
        <div className="note-badge">
          <div className="note-circle">S</div>
          <div className="note-label">RANK</div>
        </div>
      </footer>
    </div>
  );
}