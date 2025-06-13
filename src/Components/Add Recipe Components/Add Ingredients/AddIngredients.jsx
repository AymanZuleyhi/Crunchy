import "./AddIngredients.css";
import { useState, useContext } from "react";
import { RecipeContext } from "../../../Context/RecipeContext.jsx";
import ShowMore from "../../Show More/ShowMore.jsx";
import ClickableText from "../../Clickable Text/ClickableText.jsx";
import SearchIngredient from "../../Search Ingredient/SearchIngredient.jsx";
import Ingredient from "../Ingredient/Ingredient.jsx";

function AddIngredients() {
  const { recipe, setRecipe } = useContext(RecipeContext);

  const [showSelectedIngredinets, setShowSelectedIngredients] = useState(true);

  const handleShowSelectedIngredients = () => {
    setShowSelectedIngredients(!showSelectedIngredinets);
  };
  
  const removeAllIngredients = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: []
    }));
  };

  return(
    <div className="container">
      <h2>Add Ingredients <span>*</span></h2>
      <p>Add all of the ingredients nessesary for your recipe.🍇</p>
     
      <SearchIngredient />

      <ShowMore text={"Ingredient"} items={recipe.ingredients} show={showSelectedIngredinets} setterFunction={handleShowSelectedIngredients} />
      
      {showSelectedIngredinets &&
        <div className="selected-ingredients_dropdown">
          {
            recipe?.ingredients.map((ingredient, i) => {
              return (
                <Ingredient key={i} ingredient={ingredient}/>
              )
            })
          }
        </div>
      }

      {recipe?.ingredients.length !== 0 &&
        <ClickableText text={"Remove all ingredients"} onClick={removeAllIngredients}/>
      }

    </div>
  )
};

export default AddIngredients;