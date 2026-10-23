try {
  // Récupère toutes les cartes de la page
  const cartes = document.querySelectorAll(".card");

  // L'observateur surveille quand un élément entre dans la zone visible de l'écran
  const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach((entree) => {
      // isIntersecting vaut true quand l'élément est visible
      if (entree.isIntersecting) {
        entree.target.classList.add("visible"); // déclenche la transition CSS
        observateur.unobserve(entree.target);   // on arrête de surveiller cette carte
      }
    });
  });

  // On demande à l'observateur de surveiller chaque carte
  cartes.forEach((carte) => observateur.observe(carte));
} catch (erreur) {
  console.error("Erreur apparition :", erreur);
  // Si le script échoue, les cartes resteraient invisibles : on les affiche
  document.querySelectorAll(".card").forEach((c) => c.classList.add("visible"));
}