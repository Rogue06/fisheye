document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact_form");

  if (form) {
    console.log("Form found"); // Vérifier si le formulaire est trouvé

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire
      console.log("Form submitted"); // Vérifier si l'événement de soumission est capturé

      // Récupérer les valeurs des champs du formulaire
      const firstName = document.getElementById("first").value;
      const lastName = document.getElementById("last").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Afficher les valeurs dans la console
      console.log("Prénom:", firstName);
      console.log("Nom:", lastName);
      console.log("E-mail:", email);
      console.log("Message:", message);

      // Simuler une redirection après 3 secondes pour observer les valeurs dans la console
      setTimeout(() => {
        // Récupérer l'ID du photographe depuis l'URL
        const params = new URLSearchParams(window.location.search);
        const photographerId = params.get("id");

        // Rediriger l'utilisateur vers la page du photographe
        window.location.href = `photographer.html?id=${photographerId}`;
      }, 3000); // 3 secondes de délai avant la redirection
    });
  } else {
    console.error("Form not found"); // Vérifier si le formulaire n'est pas trouvé
  }
});

function displayModal() {
  const modal = document.getElementById("contact_modal");
  const mainContent = document.getElementById("main");

  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  mainContent.setAttribute("aria-hidden", "true");
  mainContent.classList.add("hidden"); // Masquer le contenu principal
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const mainContent = document.getElementById("main");

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  mainContent.setAttribute("aria-hidden", "false");
  mainContent.classList.remove("hidden"); // Afficher le contenu principal
}

// Fermer la modal lorsque la touche Échap est pressée
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
