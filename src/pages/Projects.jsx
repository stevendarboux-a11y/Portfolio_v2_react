// ============================================================
//  PAGE PROJETS
//  Les boutons de filtre permettent d'afficher uniquement les
//  projets qui utilisent une technologie donnée.
// ============================================================

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import PageNav from "../components/PageNav";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/Project.js";
import styles from "./Projects.module.css";

const ALL = "Tous";

// Liste de toutes les technologies, sans doublon (un Set ne garde
// qu'un exemplaire de chaque valeur). Calculée une fois au chargement.
const technologies = [ALL, ...new Set(projects.flatMap((project) => project.technologies))];

function Projects() {
  const [activeFilter, setActiveFilter] = useState(ALL);

  const visibleProjects =
    activeFilter === ALL
      ? projects
      : projects.filter((project) => project.technologies.includes(activeFilter));

  return (
    <PageTransition>
      <SectionHeader
        code="02"
        label="Projets"
        title="Mes missions"
        subtitle="Une sélection d'applications que j'ai conçues et développées, du front-end au déploiement."
      />

      <div className={styles.filters} role="group" aria-label="Filtrer les projets par technologie">
        {technologies.map((techno) => (
          <button
            key={techno}
            type="button"
            className={`${styles.filter} ${activeFilter === techno ? styles.filterActive : ""}`}
            aria-pressed={activeFilter === techno}
            onClick={() => setActiveFilter(techno)}
          >
            {techno}
          </button>
        ))}
      </div>

      <p className={styles.count} aria-live="polite">
        {visibleProjects.length} projet{visibleProjects.length > 1 ? "s" : ""} détecté
        {visibleProjects.length > 1 ? "s" : ""}
      </p>

      {/* layout + AnimatePresence : les cartes se réorganisent en douceur */}
      <motion.div layout className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              // index d'origine : chaque projet garde sa couleur et son numéro
              index={projects.indexOf(project)}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              github={project.github}
              demo={project.demo}
              demoAccounts={project.demoAccounts}
              image={project.image}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <PageNav current="/projects" />
    </PageTransition>
  );
}

export default Projects;
