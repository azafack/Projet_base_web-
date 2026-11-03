try {
  // ----- Récupération des éléments de la page -----
  const champEffort = document.getElementById("chrono-effort");
  const champRepos = document.getElementById("chrono-repos");
  const champSeries = document.getElementById("chrono-series");
  const zoneAffichage = document.getElementById("chrono-affichage");
  const textePhase = document.getElementById("chrono-phase");
  const texteTemps = document.getElementById("chrono-temps");
  const texteSerie = document.getElementById("chrono-serie");
  const zoneErreur = document.getElementById("chrono-erreur");
  const boutonDemarrer = document.getElementById("chrono-demarrer");
  const boutonReinit = document.getElementById("chrono-reinitialiser");

  // ----- Variables d'état : elles mémorisent où en est le chronomètre -----
  let minuteur = null;      // identifiant renvoyé par setInterval (null = chronomètre arrêté)
  let phase = "effort";     // phase en cours : "effort" ou "repos"
  let restant = 0;          // secondes restantes dans la phase
  let serieCourante = 0;    // numéro de la série en cours
  let totalSeries = 0;      // nombre total de séries
  let dureeEffort = 0;
  let dureeRepos = 0;

  // Met à jour l'écran avec l'état actuel
  function afficher() {
    texteTemps.textContent = restant;
    textePhase.textContent = (phase === "effort") ? "Effort" : "Repos";
    texteSerie.textContent = "Série " + serieCourante + " / " + totalSeries;
    // La classe "effort" ou "repos" change la couleur de la bordure (voir outils.css)
    zoneAffichage.className = "chrono-affichage " + phase;
  }

  // Arrête le minuteur
  function arreter() {
    clearInterval(minuteur);     // clearInterval stoppe le setInterval
    minuteur = null;
    boutonDemarrer.disabled = false;   // on peut relancer
  }

  // Appelée quand toutes les séries sont terminées
  function terminer() {
    arreter();
    textePhase.textContent = "Terminé !";
    texteTemps.textContent = 0;
    zoneAffichage.className = "chrono-affichage";
  }

  // Appelée toutes les secondes par setInterval
  function tic() {
    restant = restant - 1;

    // Tant qu'il reste du temps, on affiche et on s'arrête là
    if (restant > 0) {
      afficher();
      return;
    }

    // Sinon, la phase est finie : on passe à la suivante
    if (phase === "effort") {
      phase = "repos";
      restant = dureeRepos;
    } else {
      // Fin du repos : y a-t-il encore des séries à faire ?
      if (serieCourante >= totalSeries) {
        terminer();
        return;
      }
      serieCourante = serieCourante + 1;
      phase = "effort";
      restant = dureeEffort;
    }
    afficher();
  }

  // Clic sur Démarrer
  function demarrer() {
    const effort = Number(champEffort.value);
    const repos = Number(champRepos.value);
    const series = Number(champSeries.value);

    // Validation : entiers positifs dans des limites raisonnables
    if (!Number.isInteger(effort) || effort < 1 || effort > 600) {
      zoneErreur.textContent = "L'effort doit être un nombre entier de secondes entre 1 et 600.";
      zoneErreur.hidden = false;
      return;
    }
    if (!Number.isInteger(repos) || repos < 1 || repos > 600) {
      zoneErreur.textContent = "Le repos doit être un nombre entier de secondes entre 1 et 600.";
      zoneErreur.hidden = false;
      return;
    }
    if (!Number.isInteger(series) || series < 1 || series > 50) {
      zoneErreur.textContent = "Le nombre de séries doit être un entier entre 1 et 50.";
      zoneErreur.hidden = false;
      return;
    }
    zoneErreur.hidden = true;

    // On initialise l'état au début de la première série
    dureeEffort = effort;
    dureeRepos = repos;
    totalSeries = series;
    serieCourante = 1;
    phase = "effort";
    restant = dureeEffort;
    afficher();

    // Sécurité : on arrête un éventuel minuteur déjà lancé avant d'en créer un nouveau
    clearInterval(minuteur);
    boutonDemarrer.disabled = true;   // évite de lancer deux minuteurs en même temps
    // setInterval appelle tic toutes les 1000 millisecondes (1 seconde)
    minuteur = setInterval(tic, 1000);
  }

  // Clic sur Réinitialiser : on arrête tout et on remet l'écran à zéro
  function reinitialiser() {
    arreter();
    textePhase.textContent = "Prêt";
    texteTemps.textContent = 0;
    texteSerie.textContent = "Série 0 / 0";
    zoneAffichage.className = "chrono-affichage";
    zoneErreur.hidden = true;
  }

  // On branche les fonctions sur les boutons
  boutonDemarrer.addEventListener("click", demarrer);
  boutonReinit.addEventListener("click", reinitialiser);
} catch (erreur) {
  console.error("Erreur chronomètre :", erreur);
}