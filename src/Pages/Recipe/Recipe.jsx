import "./Recipe.css";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import GoBack from "../../Components/Recipe Components/Go Back/GoBack.jsx";
import Ingredients from "../../Components/Recipe Components/Ingredients/Ingredients.jsx";
import CookingInsturctions from "../../Components/Recipe Components/Cooking Instructions/CookingInstructions.jsx";
import Questions from "../../Components/Recipe Components/Questions/Questions.jsx";
import UserInformation from "../../Components/Recipe Components/User Information/UserInformation.jsx";
import NutritionInformation from "../../Components/Recipe Components/Nutrition Information/NutritionInformation.jsx";
import RecipeInformation from "../../Components/Recipe Components/Recipe Information/RecipeInformation.jsx";
import Rating from "../../Components/Recipe Components/Rating/Rating.jsx";
import { AppContext } from "../../Context/AppContext.jsx";
import { Helpers } from "../../Context/Helpers.jsx";
import Images from "../../Components/Recipe Components/Images/Images.jsx";
import Button2 from "../../Components/Button 2/Button2.jsx";
import { AppDataContext } from "../../Context/AppDataContext.jsx";

function Recipe() {
  const { backendUrl, userData, handleCheckAuth } = useContext(AppContext);
  const { handleAddToFavorites } = useContext(AppDataContext);
  const { setShowBlackScreen } = useContext(Helpers);

  const location = useLocation().pathname.split("/")[2];

  const [recipe, setRecipe] = useState();
  const [showNutritionInfo, setShowNutritionInfo] = useState(false);

  const handleShowNutritionInfo = () => {
    setShowNutritionInfo(!showNutritionInfo);
    setShowBlackScreen(!showNutritionInfo ? true : false);
  };

  const fetchRecipe = async (sort={}) => {
    const url = `${backendUrl}/recipe/single-recipe/${location}`;

    try {
      const { data } = await axios.post(url, 
        { sortQuestions: sort.questions, 
          sortReviews: sort.reviews 
        }
      );

      if(data.success) {
        setRecipe(data.recipe);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [])

  if(!recipe) {
    return <p></p>
  };

  const { 
    recipeName, 
    author, 
    rating, 
    description, 
    images, 
    cookingTime, 
    difficultyLevel, 
    portionSize, 
    nutrition, 
    ingredients, 
    cookingInstructions, 
    mealType, 
    dieteryPreference, 
    questions, 
    reviews, 
   } = recipe;

  return (
    <div className="RECIPE">

      <div className="recipe_controls">
        <GoBack />
      </div>

      <div className="recipe-hero">
        <Images images={images}/>

        <div className="header-information">
          <div className="recipe_headline">
            <h1>{recipeName}</h1>

            <Button2 
              text={"Add To Favourites"}
              onClick={(e) => handleAddToFavorites(e, handleCheckAuth, location)}
              icon={userData?.recipes.favourites.includes(location) ? faHeartSolid : faHeartRegular}/>
          </div>

          <Rating rating={rating}/>
          
          <UserInformation 
            author={author} 
            description={description} 
          />
          
          <RecipeInformation 
            cookingTime={cookingTime} 
            mealType={mealType} 
            difficultyLevel={difficultyLevel} 
            portionSize={portionSize} 
            ingredients={ingredients}
          />

          <p onClick={handleShowNutritionInfo} className="nutrition-information">Nutrition Information</p>
          
          {showNutritionInfo &&
            <NutritionInformation 
              nutrition={nutrition} 
              handleShowNutritionInfo={handleShowNutritionInfo} 
            />
          }
        </div>
      </div>
      
      <div className="ingredients-and-instructions">
        <Ingredients 
          ingredients={ingredients}
        />

        <CookingInsturctions 
          cookingInstructions={cookingInstructions}
        />
      </div>

      <div className="QUESTIONS">
        <Questions 
          type={"question"} 
          fetchContent={fetchRecipe}
          data={questions}
        />
      </div>

      <div className="REVIEWS">
        <Questions 
          type={"review"} 
          fetchContent={fetchRecipe}
          data={reviews} 
        />
      </div>
    </div>
  )
}

export default Recipe;