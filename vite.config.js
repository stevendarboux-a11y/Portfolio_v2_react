import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages sert le site sous /Portfolio_v2_react/ (le nom du repo).
  // Sans cette ligne, les fichiers JS/CSS seraient cherchés à la racine et le site serait vide.
  base: "/Portfolio_v2_react/",
});
