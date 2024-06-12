//Mettre le code JavaScript lié à la page photographer.html
fetch("data/photographers.json")
  .then((response) => response.json())
  .then((data) => {
    const photographers = data.photographers;
    console.log("Photographers data:", photographers);
  })
  .catch((error) => console.error("Error fetching data:", error));

function photographerDetails() {
    
}
