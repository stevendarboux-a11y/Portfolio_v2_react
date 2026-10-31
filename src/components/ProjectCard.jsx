// ============================================================
//  CARTE PROJET
//  - motion.article : apparition/disparition animée quand on filtre.
//  - useTilt : la carte s'incline en 3D en suivant la souris.
//  - Les longues descriptions sont coupées, avec un bouton "Lire la suite".
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import useTilt from "../hooks/useTilt";
import { ExternalIcon, GithubIcon } from "./Icons";
import DemoAccess from "./DemoAccess";
import styles from "./ProjectCard.module.css";

// Couleurs des "planètes" générées quand le projet n'a pas d'image
const PLANET_COLORS = [
  ["#8f7cff", "#2a1d6e"],
  ["#6fe3ff", "#0f3b55"],
  ["#e5e4e2", "#3a3d4a"],
  ["#ff8fd8", "#4a1840"],
  ["#7cffc4", "#0e4434"],
];

function ProjectCard({
  index,
  title,
  description,
  technologies,
  github,
  demo,
  demoAccounts,
  image,
}) {
  const [expanded, setExpanded] = useState(false);
  const tilt = useTilt(7);
  const [light, dark] = PLANET_COLORS[index % PLANET_COLORS.length];
  // padStart : 1 -> "01"
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      layout // anime le déplacement des cartes quand la grille change
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={styles.wrapper}
    >
      <div {...tilt} className={`${styles.card} glass`}>
        <span className={styles.glare} aria-hidden="true" />

        <div className={styles.visual}>
          {image ? (
            <img src={image} alt={`Aperçu du projet ${title}`} />
          ) : (
            // Variables CSS passées en style pour colorer la planète
            <div
              className={styles.planet}
              style={{ "--planet-light": light, "--planet-dark": dark }}
              aria-hidden="true"
            />
          )}
          <span className={styles.number}>PRJ-{number}</span>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>{title}</h2>

          <p className={`${styles.description} ${expanded ? styles.expanded : ""}`}>
            {description}
          </p>
          {description.length > 140 && (
            <button
              type="button"
              className={styles.more}
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
            >
              {expanded ? "Réduire" : "Lire la suite"}
            </button>
          )}

          <ul className={styles.techs} aria-label="Technologies utilisées">
            {technologies.map((techno) => (
              <li key={techno} className="tag">
                {techno}
              </li>
            ))}
          </ul>

          {/* Identifiants de test, seulement si le projet en a */}
          {demoAccounts?.length > 0 && <DemoAccess accounts={demoAccounts} />}

          <div className={styles.links}>
            <a href={github} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <GithubIcon /> Code source
            </a>
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <ExternalIcon /> Voir en ligne
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
