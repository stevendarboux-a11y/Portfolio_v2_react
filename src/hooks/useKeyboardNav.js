// ============================================================
//  HOOK PERSONNALISÉ : navigation au clavier
//  Un "hook" est une fonction qui commence par "use" et qui
//  regroupe de la logique React réutilisable.
//  Ici : appuyer sur 1, 2, 3 ou 4 ouvre la page correspondante.
// ============================================================

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pages from "../data/pages";

function useKeyboardNav() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(event) {
      // On ignore les touches tapées dans un champ de formulaire
      const target = event.target;
      const isTyping =
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
        target.isContentEditable;
      if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;

      const page = pages.find((p) => p.shortcut === event.key);
      if (page) navigate(page.path);
    }

    window.addEventListener("keydown", handleKeyDown);
    // Nettoyage : on retire l'écouteur quand le composant disparaît
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
}

export default useKeyboardNav;
