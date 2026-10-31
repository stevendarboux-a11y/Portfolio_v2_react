// ============================================================
//  TEXTURES GÉNÉRÉES
//  Dessinées avec un <canvas> 2D au chargement : aucune image à
//  télécharger. Elles sont créées une seule fois et partagées.
// ============================================================

import * as THREE from "three";

// Disque lumineux (blanc au centre -> transparent au bord).
// "stops" = liste de [position 0..1, opacité]
function createGlowTexture(stops) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([offset, alpha]) => gradient.addColorStop(offset, `rgba(255,255,255,${alpha})`));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// Point rond pour les étoiles (sinon elles seraient carrées)
export const STAR_TEXTURE = createGlowTexture([[0, 1], [0.2, 0.8], [1, 0]]);

// Halo très doux : nébuleuses, auras, couronne du soleil...
export const GLOW_TEXTURE = createGlowTexture([[0, 0.9], [0.4, 0.35], [1, 0]]);

// Disque d'accrétion du trou noir : un anneau rose/violet avec des
// traînées circulaires (qui rendent visible la rotation du disque).
function createDiskTexture() {
  const size = 512;
  const center = size / 2;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Dégradé de base : brillant près du trou noir, sombre vers l'extérieur
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0.38, "rgba(255,255,255,0)");
  gradient.addColorStop(0.42, "rgba(255,220,245,1)");
  gradient.addColorStop(0.55, "rgba(255,92,207,0.8)");
  gradient.addColorStop(0.8, "rgba(120,60,255,0.25)");
  gradient.addColorStop(1, "rgba(60,20,120,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Traînées : des arcs de cercle aléatoires
  for (let i = 0; i < 70; i++) {
    const radius = center * (0.42 + Math.random() * 0.5);
    const start = Math.random() * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(center, center, radius, start, start + 0.3 + Math.random() * 1.2);
    ctx.strokeStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.25})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

export const DISK_TEXTURE = createDiskTexture();
