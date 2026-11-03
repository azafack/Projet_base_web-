try {
  // On récupère les éléments de la page grâce à leur id
  const formulaire = document.getElementById("form-calcul");
  const zoneErreur = document.getElementById("calcul-erreur");
  const zoneResultat = document.getElementById("calcul-resultat");
  const champsObligatoires = ["taille", "poids", "age", "sexe", "activite"];


  // Affiche un message d'erreur et cache les anciens résultats
  function afficherErreur(message) {
    zoneErreur.textContent = message;   // textContent : écrit du texte dans la balise
    zoneErreur.hidden = false;          // hidden = false : on montre le message
    zoneResultat.hidden = true;
  }

  // Convertit la valeur de l'IMC en catégorie (échelle de l'OMS)
  function categorieImc(imc) {
    if (imc < 18.5) {
      return "insuffisance pondérale";
    } else if (imc < 25) {
      return "corpulence normale";
    } else if (imc < 30) {
      return "surpoids";
    } else {
      return "obésité";
    }
  }

  // "submit" se produit quand on clique sur Calculer
  formulaire.addEventListener("submit", (evenement) => {
    // preventDefault empêche le rechargement de la page, qui est le comportement par défaut d'un formulaire
    evenement.preventDefault();

    // .value renvoie du texte ; Number() le convertit en nombre (un champ vide donne 0)
    const taille = Number(document.getElementById("taille").value);
    const poids = Number(document.getElementById("poids").value);
    const age = Number(document.getElementById("age").value);
    const sexe = document.getElementById("sexe").value;
    const activite = Number(document.getElementById("activite").value);

    // ----- Étape 1 : vérifier que tous les champs sont remplis -----
    // for...of parcourt la liste : "id" prend successivement "taille", "poids", etc.
    for (const id of champsObligatoires) {
      const champ = document.getElementById(id);
      // .value donne le texte du champ ; .trim() enlève les espaces au début et à la fin
      if (champ.value.trim() === "") {
       afficherErreur("Le champ « " + champ.dataset.nom + " » doit être obligatoirement rempli.");
        champ.focus();   // place le curseur dans le champ vide
        return;          // return arrête la fonction : pas de calcul
      }
    }


    // ----- Validation : on vérifie chaque champ avant de calculer -----
    if (taille < 100 || taille > 250) {
      afficherErreur("La taille doit être comprise entre 100 et 250 cm.");
      return;   // return arrête la fonction : pas de calcul
    }
    if (poids < 30 || poids > 300) {
      afficherErreur("Le poids doit être compris entre 30 et 300 kg.");
      return;
    }
    if (age < 15 || age > 100) {
      afficherErreur("L'âge doit être compris entre 15 et 100 ans.");
      return;
    }
    if (sexe === "") {
      afficherErreur("Choisis une option pour le sexe.");
      return;
    }
    if (activite === 0) {
      afficherErreur("Choisis un niveau d'activité.");
      return;
    }
    if(poids === ""){
        afficherErreur("veillez remplir le champs");
    }

    // ----- Calcul de l'IMC : poids / taille² (la taille doit être en mètres) -----
    const imc = poids / ((taille / 100) * (taille / 100));

    // ----- Besoin énergétique (formule de Mifflin-St Jeor) -----
    // 1) métabolisme de base : l'énergie dépensée au repos
    let base = 10 * poids + 6.25 * taille - 5 * age;
    if (sexe === "homme") {
      base = base + 5;
    } else {
      base = base - 161;
    }
    // 2) on multiplie par le coefficient d'activité
    const calories = Math.round(base * activite);

    // ----- Affichage des résultats -----
    document.getElementById("imc-valeur").textContent = imc.toFixed(1);   // toFixed(1) : 1 décimale
    document.getElementById("imc-categorie").textContent = categorieImc(imc);
    document.getElementById("calories-valeur").textContent = calories;

    zoneErreur.hidden = true;     // on cache l'éventuelle erreur précédente
    zoneResultat.hidden = false;  // on montre les résultats
  });
} catch (erreur) {
  // Si une erreur se produit, la page reste affichée
  console.error("Erreur calculateur :", erreur);
}