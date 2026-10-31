// ============================================================
//  BARRE DE NAVIGATION
//  - NavLink (react-router) sait si son lien est la page active.
//  - La "pastille" lumineuse glisse d'un lien à l'autre grâce au
//    layoutId de framer-motion (même id = même élément animé).
//  - Sur mobile, les liens passent dans un menu "burger".
// ============================================================

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import pages from "../data/pages";
import profile from "../data/profile";
import styles from "./Navbar.module.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={`${styles.navbar} glass`} aria-label="Navigation principale">
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoOrb} aria-hidden="true" />
          <span>
            {profile.initials}
            <span className={styles.logoSuffix}>.dev</span>
          </span>
        </Link>

        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <ul
          id="nav-links"
          className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}
        >
          {pages.map((page) => (
            <li key={page.path}>
              <NavLink
                to={page.path}
                end={page.path === "/"} // sinon "/" serait actif sur toutes les pages
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                onClick={closeMenu}
              >
                {/* NavLink accepte une fonction comme enfant : on reçoit isActive */}
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className={styles.activePill}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={styles.code}>{page.code}</span>
                    <span className={styles.label}>{page.label}</span>
                    <kbd className={styles.kbd} title={`Raccourci : touche ${page.shortcut}`}>
                      {page.shortcut}
                    </kbd>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <p className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          Dispo · {profile.availabilityShort}
        </p>
      </nav>
    </header>
  );
}

export default Navbar;
