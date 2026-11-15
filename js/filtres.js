// filtres.js : affiche ou cache les cartes de la page Programmes selon les deux listes déroulantes
try {
  // On récupère les éléments de la page grâce à leur id ou à leur classe
  const choixObjectif = document.getElementById("filtre-objectif");
  const choixNiveau = document.getElementById("filtre-niveau");
  const cartes = document.querySelectorAll(".card");
  const message = document.getElementById("aucun-resultat");

  // Fonction qui affiche ou cache chaque carte selon les deux filtres
  function filtrer() {
    // .value donne la valeur de l'option choisie dans la liste
    const objectif = choixObjectif.value;
    const niveau = choixNiveau.value;
    let nombreVisibles = 0;

    cartes.forEach((carte) => {
      // dataset.objectif lit l'attribut data-objectif de la carte
      const bonObjectif = (objectif === "tous") || (carte.dataset.objectif === objectif);
      const bonNiveau = (niveau === "tous") || (carte.dataset.niveau === niveau);

      // La carte est affichée seulement si les DEUX conditions sont vraies
      if (bonObjectif && bonNiveau) {
        carte.hidden = false;
        nombreVisibles++;
      } else {
        carte.hidden = true;
      }
    });

    // Si aucune carte n'est visible, on affiche le message
    message.hidden = (nombreVisibles > 0);
  }

  // "change" se produit quand l'utilisateur choisit une autre option : on relance le filtre
  choixObjectif.addEventListener("change", filtrer);
  choixNiveau.addEventListener("change", filtrer);
} catch (erreur) {
  // En cas d'erreur, les cartes restent visibles : le site reste utilisable
  console.error("Erreur filtres :", erreur);
}
