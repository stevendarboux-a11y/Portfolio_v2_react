// ============================================================
//  "ERROR BOUNDARY" : filet de sécurité autour de la 3D.
//  Si le navigateur ne supporte pas WebGL (vieux appareil...),
//  la scène plante. Sans ce composant, TOUT le site serait blanc.
//  Avec lui, on affiche juste un fond étoilé en CSS à la place.
//  (Les Error Boundaries doivent encore s'écrire avec une classe.)
// ============================================================

import { Component } from "react";
import styles from "./SceneErrorBoundary.module.css";

class SceneErrorBoundary extends Component {
  state = { hasError: false };

  // Appelée par React quand un composant enfant plante
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className={styles.fallback} aria-hidden="true" />;
    }
    return this.props.children;
  }
}

export default SceneErrorBoundary;
