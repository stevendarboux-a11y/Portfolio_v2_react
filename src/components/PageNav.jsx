// ============================================================
//  "PROCHAINES DESTINATIONS"
//  Affiché en bas de chaque page : des cartes vers toutes les
//  AUTRES pages, la suivante étant mise en avant. Ainsi on peut
//  toujours rebondir ailleurs sans remonter jusqu'à la navbar.
// ============================================================

import { Link } from "react-router-dom";
import pages from "../data/pages";
import { ArrowIcon } from "./Icons";
import Reveal from "./Reveal";
import styles from "./PageNav.module.css";

// "current" est passé en prop (plutôt que lu avec useLocation) pour que
// la page qui s'en va pendant l'animation de sortie garde ses propres liens.
function PageNav({ current }) {
  const currentIndex = pages.findIndex((page) => page.path === current);
  const nextPage = pages[(currentIndex + 1) % pages.length];
  const otherPages = pages.filter((page) => page.path !== current);

  return (
    <nav className={styles.wrapper} aria-label="Autres pages du site">
      <Reveal>
        <p className="hud-label">// Prochaines destinations</p>
      </Reveal>

      <div className={styles.grid}>
        {otherPages.map((page, index) => {
          const isNext = page.path === nextPage.path;
          return (
            <Reveal key={page.path} delay={index * 0.1}>
              <Link
                to={page.path}
                className={`${styles.card} glass ${isNext ? styles.next : ""}`}
              >
                <span className={styles.top}>
                  <span className={styles.code}>{page.code}</span>
                  {isNext && <span className={styles.badge}>Suivant</span>}
                </span>
                <span className={styles.title}>{page.label}</span>
                <span className={styles.description}>{page.description}</span>
                <span className={styles.arrow}>
                  <ArrowIcon />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </nav>
  );
}

export default PageNav;
