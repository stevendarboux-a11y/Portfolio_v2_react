// ============================================================
//  TRANSITION DE PAGE (framer-motion)
//  Chaque page est enveloppée dans ce composant. framer-motion
//  anime l'entrée (initial -> animate) et la sortie (exit) :
//  la page apparaît depuis le flou, comme une image qui se stabilise.
// ============================================================

import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 40, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    // delay : on laisse d'abord le "saut en hyperespace" de la 3D se jouer
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: "blur(10px)",
    transition: { duration: 0.35, ease: "easeIn" },
  },
};

function PageTransition({ children }) {
  return (
    <motion.main
      className="page"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.main>
  );
}

export default PageTransition;
