import "./SearchIngredient.css";
import { useState, useContext, useEffect, useRef } from "react";
import { RecipeContext } from "../../Context/RecipeContext.jsx";
import { IngredientsContext } from "../../Context/IngredientsContext.jsx";
import { Helpers } from "../../Context/Helpers.jsx";
import Input from "../Input/Input";

function SearchIngredient() {
  const { setRecipe } = useContext(RecipeContext);
  const { handleClickOutside } = useContext(Helpers);
  const { 
    originalIngredients,
    ingredients, 
    setIngredients, 
    filteredIngredients, 
    setFilteredIngredients 
  } = useContext(IngredientsContext);

  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  const [userInput, setUserInput] = useState();

  let debounceTimeout
  const handleInput = (e) => {
    setIsActive(true);
    setUserInput(e.target.value);

    // Clear the timeout.
    clearTimeout(debounceTimeout);

    // Update the state if 500s have passed since the user stopped typing.
    debounceTimeout = setTimeout(() => {
      setFilteredIngredients(() => {
        return ingredients?.filter((ingredient) => ingredient.toLowerCase().includes(e.target.value.toLowerCase()) )
      });
    }, 500);
  };

  const selectIngredient = (ingredient) => {
    // Add the ingredient to recipe.ingredients.
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, {name: ingredient, unit: "", weight: ""}]
    }));

    // Remove the selected ingredient from showing up.
    setIngredients((prevIngredients) => {
      return prevIngredients.filter((eachIngredient) => eachIngredient.toLowerCase() !== ingredient.toLowerCase());
    });

    setFilteredIngredients((prevIngredients) => {
      return prevIngredients.filter((eachIngredient) => eachIngredient.toLowerCase() !== ingredient.toLowerCase());
    });

    // Hide the dropdown and reset the input.
    setIsActive(false);
    setUserInput("");
  };

  // Hide the dropdown if the user clicks outside of it.
  useEffect(() => {
    const clickHandler = (e) => handleClickOutside(e, dropdownRef, setIsActive);

    document.addEventListener("click", clickHandler);
    
    return () => {
      removeEventListener("click", clickHandler);
    };
  }, [])

  useEffect(() => {
    setIngredients(originalIngredients);
  }, [])

  return (
    <div className={`SEARCH_INGREDIENT ${isActive ? "active" : "not-active"}`}>
      <Input onChange={handleInput} value={userInput} placeholder={"Ingredient..."}/>

      {userInput !== "" && isActive &&
        <div ref={dropdownRef} className="ingredients-dropdown_options">
          {filteredIngredients?.length === 0 &&
            <p>No ingredinets match your search. 🥲</p>
          }
          {
            filteredIngredients?.map((ingredient, i) => {
              return (
                <div onClick={() => selectIngredient(ingredient)} key={i}>
                  <img src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}/>
                  <p>{ingredient}</p>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
};

export default SearchIngredient;