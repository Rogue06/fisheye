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
        <div class="photographer_portrait">
            <img src="assets/photographers/${photographer.portrait}" alt="Photo de ${photographer.name}">
        </div>
    </div>`;
}

// Fonction pour afficher le nom du photographe dans la modale de contact
function displayPhotographerNameInModal(photographer) {
  const photographName = document.querySelector(".photograph_name");
  photographName.textContent = photographer.name;
}

// Fonction pour créer une card pour un media
function createMediaCard(media) {
  const mediaCard = document.createElement("div");
  mediaCard.classList.add("media_card");

  // Créer le contenu du média
  let mediaContent = "";
  if (media.image) {
    const imagePath = `../samples_photos/${media.image}`;
    mediaContent = `<img src="${imagePath}" alt="${media.title}" class="media_image" tabindex="0">`;
  } else if (media.video) {
    const videoPath = `samples_photos/${media.video}`;
    mediaContent = `<video class="media_video" tabindex="0" title="${media.title}">
                      <source src="${videoPath}" type="video/mp4" >
                    </video>`;
  }

  // Remplir le contenu de la carte média
  mediaCard.innerHTML = `
    <div class="media_body">
      ${mediaContent}
    </div>
    <div class="media_legend">
      <h2 class="media_title">${media.title}</h2>
      <span class="media_likes">${media.likes} <i alt="likes" class="fa-regular fa-heart like-icon" tabindex="0"></i></span>
    </div>
  `;

  const likesElement = mediaCard.querySelector(".media_likes");

  // fonction de mise à jour des likes à attacher à l'event "click" ou "Enter"
  const updateLikes = (event) => {
    const likeIcon = event.target.closest(".like-icon");
    const isLiked = likeIcon.classList.contains("fa-solid");

    // Mise à jour des likes
    if (isLiked) {
      media.likes -= 1;
    } else {
      media.likes += 1;
    }

    // Création du HTML pour remplacer l'ancien, dont une nouvelle icône heart
    likesElement.innerHTML = `${media.likes} <i class="fa-${
      isLiked ? "regular" : "solid"
    } fa-heart like-icon" tabindex="0"></i>`;

    // Gestion de l'interaction de l'utilisateur en appuyant sur la touche Entrée
    const newLikeIcon = likesElement.querySelector(".like-icon");
    newLikeIcon.addEventListener("click", updateLikes);
    newLikeIcon.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        updateLikes(e);
      }
    });

    updateTotalLikes();
  };

  // Ajouter l'écouteur d'événement pour l'icône de cœur actuelle
  mediaCard.querySelector(".like-icon").addEventListener("click", updateLikes);
  mediaCard.querySelector(".like-icon").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      updateLikes(e);
    }
  });

  return mediaCard;
}

// Fonction pour afficher les médias du photographe
function displayPhotographerMedia(mediaList) {
  const mediaContainer = document.querySelector(".factory_medias");
  mediaContainer.innerHTML = "";

  mediaList.forEach((media) => {
    const mediaCard = createMediaCard(media);
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

// Fonctions de tri
function sortMedia(mediaList, criteria) {
  switch (criteria) {
    case "popularity":
      return mediaList.sort((a, b) => b.likes - a.likes);
    case "date":
      return mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "title":
      return mediaList.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return mediaList;
  }
}

// Mettre à jour le total des likes
function updateTotalLikes() {
  const mediaLikes = document.querySelectorAll(".media_likes");
  let totalLikes = 0;

  mediaLikes.forEach((likeElement) => {
    const likes = parseInt(likeElement.textContent.trim().split(" ")[0]);
    totalLikes += likes;
  });

  const photographerId = getPhotographerIdFromUrl();
  getPhotographerById(photographerId).then((photographer) => {
    const infosLabel = document.querySelector(".infos_label");
    infosLabel.innerHTML = `
      <div>
        ${totalLikes} <i class="fa-solid fa-heart"></i>
      </div>
      <div>
        ${photographer.price}€ / jour
      </div>
    `;
  });
}

// Ajout des écouteurs d'événements pour la lightbox
function addLightboxEvents() {
  const lightbox = document.getElementById("lightbox");
  const lightboxClose = lightbox.querySelector(".lightbox-close");
  const lightboxPrev = lightbox.querySelector(".lightbox-prev");
  const lightboxNext = lightbox.querySelector(".lightbox-next");
  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxVideo = lightbox.querySelector(".lightbox-video");
  const lightboxTitle = document.querySelector(".lightbox-title h2");
  let currentMediaIndex = 0;
  let mediaElements = [];

  function openLightbox(mediaElement, index) {
    mediaElements = Array.from(
      document.querySelectorAll(".media_image, .media_video")
    );
    currentMediaIndex = index;
    const mediaContent = mediaElements[index];

    if (mediaContent.tagName === "IMG") {
      lightboxImage.src = mediaContent.src;
      lightboxImage.alt = mediaContent.alt;
      lightboxImage.classList.remove("hidden");
      lightboxVideo.classList.add("hidden");
      lightboxTitle.textContent = mediaContent.alt;
    } else if (mediaContent.tagName === "VIDEO") {
      lightboxVideo.src = mediaContent.querySelector("source").src;
      lightboxVideo.classList.remove("hidden");
      lightboxImage.classList.add("hidden");
      lightboxTitle.textContent = mediaContent.title;
    }
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
  }

  function showPrevMedia() {
    currentMediaIndex =
      (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
    openLightbox(mediaElements[currentMediaIndex], currentMediaIndex);
  }

  function showNextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
    openLightbox(mediaElements[currentMediaIndex], currentMediaIndex);
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", showPrevMedia);
  lightboxNext.addEventListener("click", showNextMedia);
  document.addEventListener("keydown", (e) => {
    if (lightbox.getAttribute("aria-hidden") === "false") {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          showPrevMedia();
          break;
        case "ArrowRight":
          showNextMedia();
          break;
      }
    }
  });

  // Ajouter les événements pour ouvrir la lightbox
  document
    .querySelectorAll(".media_image, .media_video")
    .forEach((element, index) => {
      element.addEventListener("click", () => openLightbox(element, index));
      element.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          openLightbox(element, index);
        }
      });
    });
}

// Appeler la fonction d'ajout des événements de la lightbox après avoir affiché les médias
async function initPhotographerPage() {
  const photographerId = getPhotographerIdFromUrl();
  const photographer = await getPhotographerById(photographerId);
  if (photographer) {
    displayPhotographerDetails(photographer);
    displayPhotographerNameInModal(photographer);

    let mediaList = await getPhotographerMedia(photographerId);
    displayPhotographerMedia(mediaList);
    updateTotalLikes();

    // Ajout des événements de lightbox après le rendu des médias
    addLightboxEvents();

    const sortMenu = document.getElementById("sort-options");
    sortMenu.addEventListener("change", (event) => {
      const sortedMedia = sortMedia(mediaList, event.target.value);
      displayPhotographerMedia(sortedMedia);
      addLightboxEvents(); // Réattacher les événements après le tri
    });
  } else {
    console.error("Photographer not found");
  }
}

initPhotographerPage();
