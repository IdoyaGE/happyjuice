let app_id= "78924430";
let app_key= "db342ee7feb6e65a6f81176afff035f3";
//let urlcomplete = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&health=alcohol-free&dishType=Drinks&tag=juice`;
let API_URL= `https://api.edamam.com/api/recipes/v2`;



//FUNCION ASINCRONA: He hecho un fetch para crear un buscador por ingredientes de la API (filtrando bebidas alcohol-free, drinks y tag juice)
async function searchRecipes() {
  let ingredientSearch = document.getElementById("ingredient-search").value;
  let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&health=alcohol-free&dishType=Drinks&tag=juice&q=${encodeURIComponent(ingredientSearch)}`;
  let response = await fetch(url);
  let data = await response.json();//convierte los datos en JSON
  
  let juiceList = document.getElementById("juice-list");
  juiceList.innerHTML = "";//variable en función del ingrediente que le meta, para obtener los zumos con ese ingrediente
  
  data.hits.forEach((hit) => {
    let juice = hit.recipe;//así llego directamente a la segunda capa
    let juiceDiv = document.createElement("div");
    //Creo la variable imagen del zumo y le asigno un id con un setAttribute
    let image = document.createElement("img");
    image.setAttribute("id","imagerecipe");
    image.src = juice.image;
    juiceDiv.appendChild(image);
    //Creo la variable label con el nombre del zumo que es un título y le asigno un id con un setAttibute
    let label = document.createElement("h2");
    label.setAttribute("id","labelrecipe");
    label.innerText = juice.label;
    juiceDiv.appendChild(label);
    //Creo la variable ingredientes que es un párrafo y le asigno un id con un setAttibute (el buscador localiza todos los zumos que contienen el ingrediente que se mete en el placeholder)
    let ingredients = document.createElement("p");
    ingredients.setAttribute("id","ingredientsrecipe");
    ingredients.innerText = juice.ingredientLines.join(", ");//join porque está en la tercera capa de datos
    juiceDiv.appendChild(ingredients);
    //Creo la variable calories que es un número (pendiente crear un contador animación que finalice en las calorias sin decimales)
    //let calories = document.createElement("p");
    //calories.innerText = juice.calories;
    //juiceDiv.appendChild(calories);
    //Creo la variable health label para etiquetar con ...free los zumos para el tema de alergias, descartado por tener demasiadas etiquetas)
    //let healthlabel = document.createElement("p");
    //healthlabel.innerText = juice.healthLabels;
    //juiceDiv.appendChild(healthlabel);
    //Creo la url que nos lleva directamente a la receta (nos da más datos) y le asigno un id
    let urlLink = document.createElement("a");
    urlLink.href = juice.url;
    urlLink.innerText = "Do it at home";
    juiceDiv.appendChild(urlLink);
    
    juiceList.appendChild(juiceDiv);
  });
}

