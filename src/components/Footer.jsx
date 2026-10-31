import profile from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./Icons";
import styles from "./Footer.module.css";

function Footer() {
  // Calculé automatiquement : pas besoin de changer l'année chaque 1er janvier
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        © {year} {profile.firstName} {profile.lastName} — Conçu et codé avec React & Three.js
      </p>
      <p className={styles.hint}>
        Astuce : touches <kbd>1</kbd> à <kbd>4</kbd> pour naviguer
      </p>
      <div className={styles.socials}>
        <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GithubIcon />
        </a>
        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedinIcon />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
