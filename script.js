const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector ('.recipe-closeBtn');


//Funciton to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes..</h2>";
        
    try{

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src = "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        //Adding EventLinstener to recipe button
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
        // console.log(response.meals[0]);
    });
   }
   catch(error){
        recipeContainer.innerHTML = "<h2>Correct the meal name :)</h2>";
   }
}

//Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    //console.log(meal);
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
        else {
            break;
        }
    }
    return ingredientsList;
}

//Function to get recipePopUp
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
         <h2 class = "recipeName">${meal.strMeal}</h2> 
         <h3 class = "Ingredents">Ingredents:</h3>
         <ol class = "IngredientsList">${fetchIngredients(meal)}</ol>
         <div class = "recipeInstructions">
            <h3>Instructions:</h3>
            <br>
            <p>${meal.strInstructions}</p>
        </div> 
        <h3 class = "Youtubelink">Youtube Link :</h3>
        <br>
        <p> ${meal.strYoutube}</p>
        `
    //Display the
    recipeDetailsContent.parentElement.style.display = "block";
}

//Function to close the Popup
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

//Function for the searchBtn
searchBtn.addEventListener('click', (e) => {
    //prevent page from auto referesh
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    //console.log("Button clicked")
});