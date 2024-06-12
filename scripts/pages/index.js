async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    /*    console.log("Fetched data:", data); */
    return data;
  } catch (error) {
    console.error("Error fetching photographers:", error);
    return { photographers: [] };
  }
}
/* console.log(getPhotographers()); */

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const imgAlt = `Photo de ${photographer.name}`; // Défini la description de l'image ALT
    const photographerModel = photographerTemplate(photographer, imgAlt);
    const userCardDOM = photographerModel.getUserCardDOM();
    userCardDOM.querySelector("img").setAttribute("alt", imgAlt); // Ajouter l'attribut alt à l'image.
    userCardDOM.setAttribute(
      "aria-label",
      `Carte du photographe ${photographer.name}`
    ); // ajout attr Arial-label

    // Créer le lien autour de la carte du photographe
    const photographerLink = document.createElement("a");
    photographerLink.href = `./photographer.html?id=${photographer.id}`;
    photographerLink.setAttribute(
      "aria-label",
      `Lien vers la page du photographe ${photographer.name}`
    );

    photographerLink.appendChild(userCardDOM);
    photographersSection.appendChild(photographerLink);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
