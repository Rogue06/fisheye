// Fetch photographers data
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

  // Création des div pour contenir les informations du photographe
  photographerHeader.innerHTML = `
    <div class="photographer_section">
        <div class="photographer_infos">
            <h1 class="photographer_name">${photographer.name}</h1>
            <p class="photographer_location">${photographer.city}, ${photographer.country}</p>
            <p class="photographer_tagline">${photographer.tagline}</p>
        </div>  
        <div class="content_button">
                <button class="contact_button" onclick="displayModal()">
                Contactez-moi
            </button>
        </div>
        <div class="content_photo">
            <img src="assets/photographers/${photographer.portrait}" alt="Photo de ${photographer.name}">
        </div>
    </div>`;
}

// Fonction pour créer une card pour un media
function createMediaCard(media, photographerName) {
  const mediaCard = document.createElement("div");
  mediaCard.classList.add("media_card");

  // Créer le contenu du média
  let mediaContent = "";
  if (media.image) {
    const imagePath = `assets/media/${photographerName}/${media.image}`; // ici je n'ai pas très bien compris comment mettre le bon chemin...
    mediaContent = `<img src="${imagePath}" alt="${media.title}" class="media_image" onerror="this.onerror=null; this.src='assets/media/default-image.jpg';">`;
  } else if (media.video) {
    const videoPath = `assets/media/${photographerName}/${media.video}`;
    mediaContent = `<video controls class="media_video" onerror="this.onerror=null; this.src='assets/media/default-video.mp4';">
                      <source src="${videoPath}" type="video/mp4">
                    </video>`;
  }

  // Remplir le contenu de la carte média
  mediaCard.innerHTML = `
    <div class="media_header">
      <h2 class="media_title">${media.title}</h2>
    </div>
    <div class="media_body">
      ${mediaContent}
    </div>
    <div class="media_footer">
      <span class="media_likes">${media.likes} likes</span>
    </div>
  `;

  return mediaCard;
}

// Fonction pour afficher les médias du photographe
function displayPhotographerMedia(mediaList, photographerName) {
  const mediaContainer = document.querySelector(".factory_medias");
  mediaContainer.innerHTML = "";

  mediaList.forEach((media) => {
    const mediaCard = createMediaCard(media, photographerName);
    mediaContainer.appendChild(mediaCard);
  });
}

// Fonction pour obtenir les médias du photographe
async function getPhotographerMedia(photographerId) {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data.media.filter((media) => media.photographerId == photographerId);
  } catch (error) {
    console.error("Error fetching media data:", error);
    return [];
  }
}

// Intégrer le tout
async function initPhotographerPage() {
  const photographerId = getPhotographerIdFromUrl();
  const photographer = await getPhotographerById(photographerId);
  if (photographer) {
    displayPhotographerDetails(photographer);

    const mediaList = await getPhotographerMedia(photographerId);
    displayPhotographerMedia(mediaList, photographer.name);
  } else {
    console.error("Photographer not found");
  }
}

initPhotographerPage();
