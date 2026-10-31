// ============================================================
//  PAGE ACCUEIL
//  Le texte est à gauche ; la planète 3D (dans SpaceScene) se
//  place à droite pour cette page.
// ============================================================

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import PageNav from "../components/PageNav";
import TypingText from "../components/TypingText";
import { ArrowIcon } from "../components/Icons";
import profile from "../data/profile";
import projects from "../data/Project";
import styles from "./Home.module.css";

// Animation "en cascade" : le parent déclenche ses enfants un par un
// (staggerChildren), chaque enfant utilisant la variante "item".
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function Home() {
  // Chiffres clés : le nombre de projets se met à jour tout seul
  const stats = [
    { value: String(projects.length).padStart(2, "0"), label: "Projets réalisés" },
    { value: "Full", label: "Stack : front + back" },
    { value: profile.availabilityShort, label: "Début de l'alternance" },
  ];

  return (
    <PageTransition>
      <motion.section
        className={styles.hero}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className={`hud-label ${styles.status}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          Système en ligne — {profile.availability}
        </motion.p>

        <motion.p variants={item} className={styles.greeting}>
          Bonjour, je suis
        </motion.p>

        <motion.h1 variants={item} className={`${styles.name} gradient-text`}>
          {profile.firstName}
          <br />
          {profile.lastName}
        </motion.h1>

        <motion.h2 variants={item} className={styles.role}>
          <TypingText words={profile.roles} />
        </motion.h2>

        <motion.p variants={item} className={styles.tagline}>
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className={styles.ctas}>
          <Link to="/projects" className="btn btn-primary">
            Explorer mes projets <ArrowIcon />
          </Link>
          <Link to="/contact" className="btn btn-ghost">
            Me contacter
          </Link>
        </motion.div>

        <motion.ul variants={item} className={styles.stats}>
          {stats.map((stat) => (
            <li key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </motion.ul>
      </motion.section>

      {/* Indicateur "faites défiler" */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span />
      </div>

      <PageNav current="/" />
    </PageTransition>
  );
}

export default Home;
