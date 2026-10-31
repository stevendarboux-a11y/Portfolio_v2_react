// ============================================================
//  PAGE À PROPOS
//  Présentation, compétences, parcours (frise) et CV.
//  Tout le contenu vient de src/data/profile.js.
// ============================================================

import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import PageNav from "../components/PageNav";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import { ArrowIcon, DownloadIcon } from "../components/Icons";
import profile from "../data/profile";
import styles from "./About.module.css";

// BASE_URL vaut "/Portfolio_v2_react/" (défini dans vite.config.js) :
// indispensable pour que les fichiers de /public soient trouvés sur GitHub Pages.
const publicFile = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

function About() {
  return (
    <PageTransition>
      <SectionHeader
        code="03"
        label="À propos"
        title="Qui suis-je ?"
        subtitle="Le carnet de bord : qui je suis, ce que je sais faire et le chemin parcouru."
      />

      {/* ---------- Présentation ---------- */}
      <section className={styles.intro}>
        <Reveal className={styles.avatarColumn}>
          <div className={styles.avatar}>
            {/* Anneaux en orbite autour de la photo */}
            <span className={styles.orbit} aria-hidden="true" />
            <span className={`${styles.orbit} ${styles.orbitSlow}`} aria-hidden="true" />
            {profile.photo ? (
              <img
                src={publicFile(profile.photo)}
                alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
                className={styles.photo}
              />
            ) : (
              <span className={styles.initials}>{profile.initials}</span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15} className={`${styles.bio} glass`}>
          <p className="hud-label">// Journal de bord</p>
          {profile.bio.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}

          <dl className={styles.facts}>
            {profile.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.actions}>
            {/* "download" propose de télécharger le fichier au lieu de l'ouvrir */}
            <a href={publicFile(profile.cv)} download className="btn btn-primary">
              <DownloadIcon /> Télécharger mon CV
            </a>
            <Link to="/contact" className="btn btn-ghost">
              Me contacter <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------- Compétences ---------- */}
      <section className={styles.section}>
        <Reveal>
          <h2 className={styles.sectionTitle}>
            <span className="hud-label">Arsenal</span> Compétences
          </h2>
        </Reveal>

        <div className={styles.skillsGrid}>
          {profile.skills.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.12} className={`${styles.skillCard} glass`}>
              <span className={styles.skillIndex}>0{index + 1}</span>
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Parcours (frise chronologique) ---------- */}
      <section className={styles.section}>
        <Reveal>
          <h2 className={styles.sectionTitle}>
            <span className="hud-label">Trajectoire</span> Parcours
          </h2>
        </Reveal>

        <ol className={styles.timeline}>
          {profile.journey.map((step, index) => (
            <li key={step.title} className={styles.step}>
              {/* Le point lumineux sur la ligne : rond = formation, losange = expérience */}
              <span
                className={`${styles.node} ${step.type === "experience" ? styles.nodeExperience : ""}`}
                aria-hidden="true"
              />
              <Reveal delay={index * 0.1} className={`${styles.stepCard} glass`}>
                <p className={styles.period}>
                  {step.period} · {step.type === "experience" ? "Expérience" : "Formation"}
                </p>
                <h3>{step.title}</h3>
                <p className={styles.place}>{step.place}</p>
                <p className={styles.stepDescription}>{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <PageNav current="/about" />
    </PageTransition>
  );
}

export default About;
