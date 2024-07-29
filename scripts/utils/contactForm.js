document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact_form");

  if (form) {
    console.log("Form found"); // Vérifier si le formulaire est trouvé

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire
      console.log("Form submitted");

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

      // Fermer la modal et réinitialiser le formulaire
      closeModal();
      form.reset();
    });
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
