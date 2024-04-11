const itemResults = document.querySelector('.search-result'); 
const button = document.querySelector('#search');
const drinkList = document.getElementById("drink");
const cocktailsDetailsContent = document.querySelector('.cocktails-details-content')
const recipeCloseBtn = document.getElementById("recipe-close-btn")


button.addEventListener('click', getDrinkList);
drinkList.addEventListener('click', getDrinkRecipe)

async function getDrinkList() {
    let inputValue = document.getElementById('search-text').value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.drinks) {
                data.drinks.forEach(drink => {
                    html += `
                        <div class="drink-item"> 
                            <div class="image">
                                <img class="drink-image"
                                    src="${drink.strDrinkThumb}"
                                    alt="...">
                            </div>
                            <div class="cocktail-name">    
                                <h5 class="cocktail-description">${drink.strDrink}</h5>
                                
                                <a href="#" class="recipe-btn">View recipe</a>
                            </div>
                        </div>
                    `;
                });
                  

                
                
            }
            drinkList.innerHTML = html;
        });
}

function getDrinkRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let drinkItem = e.target.parentElement.parentElement;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkItem.dataset.id}`)
        .then(response => response.json())
        .then(data => drinkRecipeModal(data.drinks))
    };
}
  

function drinkRecipeModal(drink){
    console.log(drink);
    drink = drink[0]
    let html = `
    <h2 class="recipe-title">${drink.strDrink}</h2>
            <p class="recipe-category">${drink.strCategory}</p>
            <div class="recipe-instruct">
                <h3>Instructions:</h3>
                <p>${drink.strInstructions}</p>
            </div>
            <div class="recipe-drink-img">
                <img src="${drink.strDrinkThumb}" alt="..">
            </div>
    `
    cocktailsDetailsContent.innerHTML = html;
    cocktailsDetailsContent.parentElement.classList.add('showRecipe')
}
