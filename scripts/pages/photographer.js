//Mettre le code JavaScript lié à la page photographer.html
fetch("data/photographers.json")
  .then((response) => response.json())
  .then((data) => {
    const photographers = data.photographers;
    console.log("Photographers data:", photographers);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Récupérer l'ID de l'URL
function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Rechercher le photographe dans le JSON
async function getPhotographerById(id) {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data.photographers.find((photographer) => photographer.id == id);
  } catch (error) {
    console.log("Error fetching photographers:", error);
    return null;
  }
}

// Afficher les informations du photographe
function displayPhotographerDetails(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");

  // Création d'une div pour contenir les informations du photographe
  const photographerInfo = document.createElement("div");
  photographerInfo.classList.add("photographer_section");
  photographerHeader.innerHTML = `
  <div class="photographer_section">
    <h1>${photographer.name}</h1>
    <p>${photographer.city}, ${photographer.country}</p>
    <p>${photographer.tagline}</p>
    <p>${photographer.price}€/jour</p>
    <img src="assets/photographers/${photographer.portrait}" alt="Photo de ${photographer.name}">`;

  // Ajout du bouton à l'intérieur de photographerHeader s'il n'est pas déjà présent
  const contactButton = photographerHeader.querySelector(".contact_button");
  if (!contactButton) {
    const button = document.createElement("button");
    button.classList.add("contact_button");
    button.textContent = "Contactez-moi";
    button.addEventListener("click", displayModal);
    photographerHeader.appendChild(button);
  }
}

// Intégrer le tout
async function initPhotographerPage() {
  const photographerId = getPhotographerIdFromUrl();
  const photographer = await getPhotographerById(photographerId);
  if (photographer) {
    displayPhotographerDetails(photographer);
  } else {
    console.error("Photographer not found");
  }
}

initPhotographerPage();
