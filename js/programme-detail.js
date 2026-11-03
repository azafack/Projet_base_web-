try {
  // Toutes les sections de programmes, et les liens du sommaire
  const programmes = document.querySelectorAll(".programme");
  const liensSommaire = document.querySelectorAll(".sommaire a");

  // Fonction qui affiche le programme dont l'id est dans l'adresse, et cache les autres
  function afficherProgramme() {
    // location.hash vaut par exemple "#prise-de-masse" : slice(1) retire le #
    const idChoisi = location.hash.slice(1);
    // On cherche la section qui porte cet id
    const choisi = document.getElementById(idChoisi);

    // Si l'id ne correspond à aucun programme (adresse sans #), on montre le premier
    const aAfficher = (choisi && choisi.classList.contains("programme")) ? choisi : programmes[0];

    programmes.forEach((programme) => {
      // hidden = true cache la section, false l'affiche
      programme.hidden = (programme !== aAfficher);
    });

    // Dans le sommaire, on marque le lien du programme affiché comme "actif"
    liensSommaire.forEach((lien) => {
      if (lien.getAttribute("href") === "#" + aAfficher.id) {
        lien.setAttribute("aria-current", "true");
      } else {
        lien.removeAttribute("aria-current");
      }
    });

    // On met à jour le titre de l'onglet avec le nom du programme
    document.title = "FitZone - " + aAfficher.querySelector("h2").textContent;
  }

  // Au chargement de la page : on affiche le programme demandé
  afficherProgramme();

  // "hashchange" se produit quand la partie après le # change (clic dans le sommaire) :
  // on change de programme sans recharger la page
  window.addEventListener("hashchange", afficherProgramme);
} catch (erreur) {
  // En cas d'erreur, toutes les sections restent visibles : la page reste utilisable
  console.error("Erreur détail programme :", erreur);
}
