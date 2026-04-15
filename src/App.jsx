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

  // Scroll spy avec détection plus précise
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "hero", element: document.getElementById("hero") },
        { id: "about", element: document.getElementById("about") },
        { id: "skills", element: document.getElementById("skills") },
        { id: "projects", element: document.getElementById("projects") },
        { id: "contact", element: document.getElementById("contact") },
      ];

      let current = "hero";
      const scrollPos = window.scrollY + 100; // Offset pour une meilleure détection

      for (let section of sections) {
        if (section.element) {
          const { top, bottom } = section.element.getBoundingClientRect();
          const elementTop = window.scrollY + top;

          if (scrollPos >= elementTop) {
            current = section.id;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <Header
        active={activeSection}
        onNavigate={scrollTo}
        themeLight={themeLight}
        toggleTheme={() => setThemeLight((v) => !v)}
      />
      <main id="main" className="main-content">
        <Hero onCTA={() => scrollTo("projects")} />
        <About />
        <Skills />
        <Projects projects={PROJECTS} onOpen={setModalProject} />
        <Contact />
      </main>
      <Footer onTop={() => scrollTo("hero")} />
      {modalProject && (
        <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </div>
  );
}