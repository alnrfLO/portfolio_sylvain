import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ProjectModal from "./components/ProjectModal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PROJECTS from "./data/projects";

export default function App() {
  const [themeLight, setThemeLight] = useState(() => {
    try {
      const s = localStorage.getItem("themeLight");
      return s ? JSON.parse(s) : false;
    } catch {
      return false;
    }
  });
  const [activeSection, setActiveSection] = useState("hero");
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    localStorage.setItem("themeLight", JSON.stringify(themeLight));
    document.documentElement.classList.toggle("theme-light", themeLight);
  }, [themeLight]);

  // simple scroll spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const openModal = (project) => setModalProject(project);
  const closeModal = () => setModalProject(null);

  return (
    <div className="app">
      <a className="skip-link" href="#main">Aller au contenu</a>
      <Header
        active={activeSection}
        onNavigate={(id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
        themeLight={themeLight}
        toggleTheme={() => setThemeLight((v) => !v)}
      />
      <main id="main" className="container">
        <Hero onPrimary={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} />
        <About />
        <Skills />
        <Projects projects={PROJECTS} onOpen={openModal} />
        <Contact />
      </main>
      <Footer onTop={() => document.getElementById("main")?.scrollIntoView({ behavior: "smooth" })} />
      {modalProject && <ProjectModal project={modalProject} onClose={closeModal} />}
    </div>
  );
}