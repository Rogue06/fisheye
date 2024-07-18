document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact_form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire

    console.log("Form submitted"); // Message de débogage

    // Récupérer les valeurs des champs du formulaire
    const firstName = document.getElementById("first").value;
    const lastName = document.getElementById("last").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Stocker les valeurs dans la console
    console.log("Prénom:", firstName);
    console.log("Nom:", lastName);
    console.log("E-mail:", email);
    console.log("Message:", message);

    // Récupérer l'ID du photographe depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const photographerId = params.get("id");

    // Rediriger l'utilisateur vers la page du photographe
    window.location.href = `photographer.html?id=${photographerId}`;
  });
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
