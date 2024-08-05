/* eslint-disable no-unused-vars */
const photographerData = [];

function photographerTemplate(data) {
  const { name, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  const photographer = { name: name, picture: picture };

  photographerData.push(photographer);

  function getUserCardDOM() {
    const { city, country, tagline, price } = data; // Récupère les informations du photographe

    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const pCity = document.createElement("p");
    pCity.className = "photographers-location";
    pCity.textContent = `${city}, ${country}`;

    const pTagline = document.createElement("p");
    pTagline.textContent = tagline;

    const pPrice = document.createElement("p");
    pPrice.className = "photographers-price";
    pPrice.textContent = `${price}€ / jour`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(pCity);
    article.appendChild(pTagline);
    article.appendChild(pPrice);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
