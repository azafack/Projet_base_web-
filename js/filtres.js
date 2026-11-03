try {
  // On récupère les éléments de la page grâce à leur id ou à leur classe
  const choixObjectif = document.getElementById("filtre-objectif");
  const choixNiveau = document.getElementById("filtre-niveau");
  const cartes = document.querySelectorAll(".card");
  const message = document.getElementById("aucun-resultat");

  // Fonction qui affiche ou cache chaque carte selon les deux filtres
  function filtrer() {
    const objectif = choixObjectif.value;
    const niveau = choixNiveau.value;
    let nombreVisibles = 0;

    cartes.forEach((carte) => {
      const bonObjectif = (objectif === "tous") || (carte.dataset.objectif === objectif);
      const bonNiveau = (niveau === "tous") || (carte.dataset.niveau === niveau);
      if (bonObjectif && bonNiveau) {
        carte.hidden = false;
        nombreVisibles++;
      } else {
        carte.hidden = true;
      }
    });
    message.hidden = (nombreVisibles > 0);
  }

  choixObjectif.addEventListener("change", filtrer);
  choixNiveau.addEventListener("change", filtrer);
} catch (erreur) {
  // En cas d'erreur, les cartes restent visibles : le site reste utilisable
  console.error("Erreur filtres :", erreur);
}
