import "./AddRecipe.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { RecipeContext } from "../../Context/RecipeContext.jsx";
import { useNavigate } from "react-router-dom";
import Nutrition from "../../Components/Add Recipe Components/Nutrition/Nutrition";
import DifficultyLevel from "../../Components/Add Recipe Components/Difficulty Level/DifficultyLevel.jsx";
import RecipeName from "../../Components/Add Recipe Components/Recipe Name/RecipeName.jsx";
import OptionsSelector from "../../Components/Add Recipe Components/Options Selector/OptionsSelector.jsx";
import AddInstruction from "../../Components/Add Recipe Components/Add Instruction/AddInstruction.jsx";
import CookingTime from "../../Components/Add Recipe Components/Cooking Time/CookingTime.jsx";
import PortionSize from "../../Components/Add Recipe Components/Portion Size/PortionSize.jsx";
import Button from "../../Components/Button/Button.jsx";
import AddIngredients from "../../Components/Add Recipe Components/Add Ingredients/AddIngredients.jsx";
import Description from "../../Components/Add Recipe Components/Description/Description.jsx";
import UploadRecipeImages from "../../Components/Add Recipe Components/Upload Recipe Images/UploadRecipeImages.jsx";

const mealType = [
  "Breakfast", "Brunch", "Lunch", "Dinner", "Snack", "Appetizer", "Main Course", "Side Dish", "Dessert", "Beverae"
];
const dieteryPreference = [
  "Vegetarian", "Vegan", "Pescatarian", "Gluten-Free", "Keto", "Paleo", "Dairy-Free", "Low-Carb", "High-Protein", "Mediterranean"
];

function AddRecipe() {
  const navigate = useNavigate();

  const { backendUrl } = useContext(AppContext);
  const { defaultRecipe, recipe, setRecipe } = useContext(RecipeContext);

  const [isValid, setIsValid] = useState(false);

  const submitRecipe = async (e) => {
    e.preventDefault();

    const url = `${backendUrl}/recipe/add`;

    const { active, ...newCookingTime } = recipe.cookingTime;

    const finalRecipe = {
      ...recipe, 
      cookingTime: newCookingTime
    };

    try {
      const { data } = await axios.post(url, 
        { recipe: finalRecipe }, 
        { withCredentials: true }
      );

      if(data.success) {
        navigate("/");
        toast(data.message);
        setRecipe(defaultRecipe); // Set the recipe back to default.
      } else {
        toast.error(data.message);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  const checkValidity = () => {
    const { 
      recipeName, 
      description, 
      images, 
      portionSize, 
      cookingTime, 
      difficultyLevel, 
      nutrition, 
      ingredients, 
      cookingInstructions, 
      mealType, 
      dieteryPreference 
    } = recipe;
    
    if(
      recipeName.trim().length > 0 &&
      description.trim().length > 0 &&
      images.length > 0 &&
      ingredients.length > 0 &&
      cookingInstructions.length > 0 &&
      mealType.length > 0 &&
      dieteryPreference.length > 0
    )
    {
      setIsValid(true);
    } else {
      setIsValid(false);
    };
  };

  useEffect(() => {
    // Make sure the user is at the top of the page when it loads. Also, make sure all of the fields are empty.
    window.scrollTo(0, 0);
    setRecipe(defaultRecipe);
  }, [])

  useEffect(() => {
    checkValidity();
  }, [recipe])

  return (
    <div className="ADD_RECIPE">
      <h1>Add a recipe</h1>
      <p>Bellow you can add all of the information related to your recipe.</p>

      <form onSubmit={submitRecipe} className="add-recipe_form">
        <RecipeName />
        <Description />
        <UploadRecipeImages />
        <PortionSize />
        <CookingTime />
        <DifficultyLevel />
        <Nutrition />
        <AddIngredients />
        <AddInstruction />
        <OptionsSelector description={"Select the relevant meal types."} child={"mealType"}  h2={"Meal Type"} options={mealType} />
        <OptionsSelector description={"Select the relevant dietery preferences."} child={"dieteryPreference"} h2={"Dietery Preference"} options={dieteryPreference} />
        
        <Button 
          type={isValid ? "valid" : "invalid"}
          text={"Submit"} 
          style={{maxWidth: "500px", width:"100%"}} />
      </form>
    </div>
  )
};

export default AddRecipe;