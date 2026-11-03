// main.js : scripts communs à toutes les pages (menu burger)
// try/catch : si une erreur survient, le reste du site continue de fonctionner
try {
  // Le bouton ☰ et le menu qu'il ouvre
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");

  // On vérifie que les deux éléments existent avant de les utiliser
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // toggle ajoute la classe "open" si elle est absente, la retire sinon ; renvoie true si ajoutée
      const ouvert = nav.classList.toggle("open");
      // On informe les lecteurs d'écran de l'état du menu
      toggle.setAttribute("aria-expanded", String(ouvert));
    });
  }
} catch (erreur) {
  console.error("Erreur menu :", erreur);
}
