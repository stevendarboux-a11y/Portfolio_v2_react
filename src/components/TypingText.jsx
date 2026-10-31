// ============================================================
//  EFFET "MACHINE À ÉCRIRE"
//  Écrit un mot lettre par lettre, attend, l'efface, puis passe
//  au mot suivant. Tout repose sur un useEffect qui programme
//  la prochaine étape avec setTimeout à chaque changement d'état.
// ============================================================

import { useEffect, useState } from "react";
import styles from "./TypingText.module.css";

function TypingText({ words, typingSpeed = 70, pause = 1800 }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && text === currentWord) {
      // Mot complet : on attend avant de l'effacer
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === "") {
      // Mot effacé : on passe au suivant (le % fait boucler la liste)
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
      }, 300);
    } else {
      // On ajoute ou retire une lettre
      const nextLength = text.length + (isDeleting ? -1 : 1);
      timeout = setTimeout(
        () => setText(currentWord.slice(0, nextLength)),
        isDeleting ? typingSpeed / 2 : typingSpeed,
      );
    }

    // Nettoyage : annule le minuteur si le composant change ou disparaît
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, pause]);

  return (
    <span className={styles.wrapper}>
      {/* Les lecteurs d'écran lisent la liste complète, pas l'animation */}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className={styles.caret} />
      </span>
    </span>
  );
}

export default TypingText;
