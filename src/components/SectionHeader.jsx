// ============================================================
//  EN-TÊTE DE PAGE : "02 // PROJETS" + grand titre + sous-titre
// ============================================================

import styles from "./SectionHeader.module.css";

function SectionHeader({ code, label, title, subtitle }) {
  return (
    <header className={styles.header}>
      <p className="hud-label">
        {code} // {label}
      </p>
      <h1 className={`${styles.title} gradient-text`}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <span className={styles.line} aria-hidden="true" />
    </header>
  );
}

export default SectionHeader;
