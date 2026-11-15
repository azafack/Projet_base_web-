// planning.js : met en évidence la colonne du jour actuel dans le tableau du planning
// try/catch : si une erreur survient, le tableau reste affiché normalement
try {
  // Noms des jours dans l'ordre de getDay() : 0 = dimanche, 1 = lundi, ..., 6 = samedi
  const nomsJours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

  // new Date() donne la date d'aujourd'hui ; getDay() renvoie le numéro du jour (0 à 6)
  const numeroJour = new Date().getDay();

  // Dans le tableau, la colonne 0 contient les programmes, puis lundi = 1 ... dimanche = 7.
  // (numeroJour + 6) % 7 transforme dimanche=0, lundi=1... en lundi=0 ... dimanche=6, puis + 1.
  const colonne = (numeroJour + 6) % 7 + 1;

  // Pour chaque ligne du tableau (en-tête comprise), on marque la case de la bonne colonne
  const lignes = document.querySelectorAll(".planning tr");
  lignes.forEach((ligne) => {
    // ligne.cells : la liste des cases (th et td) de la ligne
    const caseDuJour = ligne.cells[colonne];
    if (caseDuJour) {
      caseDuJour.classList.add("aujourdhui");
    }
  });

  // On affiche un petit message au-dessus du tableau
  const message = document.getElementById("message-jour");
  if (message) {
    message.textContent = "Aujourd'hui, c'est " + nomsJours[numeroJour] + " : ta colonne est surlignée.";
    message.hidden = false;
  }
} catch (erreur) {
  console.error("Erreur planning :", erreur);
}
