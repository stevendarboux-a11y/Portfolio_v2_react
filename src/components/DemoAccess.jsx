// ============================================================
//  ACCÈS DÉMO
//  Affiche les identifiants de test d'un projet en ligne, avec
//  un bouton "copier" pour chaque valeur : le visiteur n'a plus
//  qu'à coller dans le formulaire de connexion du projet.
// ============================================================

import { useState } from "react";
import { CheckIcon, CopyIcon } from "./Icons";
import styles from "./DemoAccess.module.css";

function DemoAccess({ accounts }) {
  // Mémorise QUELLE valeur vient d'être copiée (ex : "0-login"),
  // pour afficher la coche uniquement sur ce bouton-là.
  const [copiedKey, setCopiedKey] = useState(null);

  async function copy(value, key) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Presse-papiers bloqué par le navigateur : la valeur reste lisible à l'écran
    }
  }

  return (
    <div className={styles.panel}>
      <p className={styles.heading}>
        <span className={styles.dot} aria-hidden="true" />
        Accès démo
      </p>

      {accounts.map((account, index) => (
        <dl key={account.role} className={styles.account}>
          <span className={styles.role}>{account.role}</span>
          {[
            { label: "Identifiant", value: account.login, field: "login" },
            { label: "Mot de passe", value: account.password, field: "password" },
          ].map(({ label, value, field }) => {
            const key = `${index}-${field}`;
            const copied = copiedKey === key;
            return (
              <div key={field} className={styles.row}>
                <dt>{label}</dt>
                <dd>
                  <code>{value}</code>
                  <button
                    type="button"
                    className={`${styles.copy} ${copied ? styles.copied : ""}`}
                    onClick={() => copy(value, key)}
                    aria-label={`Copier ${label.toLowerCase()} (${account.role})`}
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </dd>
              </div>
            );
          })}
        </dl>
      ))}
    </div>
  );
}

export default DemoAccess;
