import { createContext, useState } from "react";

export const RecipeContext = createContext(null);

const defaultRecipe = {
  recipeName: "",
  description: "",
  images: [],
  cookingTime: { name: "Under 30 minutes", time: 1 },
  portionSize: {quantity: "", value: ""},
  difficultyLevel: { name: "Beginners", difficulty: 1 },
  nutrition: {
    "Calories": 0,
    "Fats": 0 ,
    "Saturated Fats": 0,
    "Carbohydrates": 0,
    "Fiber": 0,
    "Sugar": 0,
    "Protein": 0 ,
    "Sodium": 0
  },
  ingredients: [],
  cookingInstructions: [],
  mealType: [],
  dieteryPreference: [],
};

function RecipeContextFunction({ children }) {
  const [recipe, setRecipe] = useState({
    recipeName: "",
    description: "",
    images: [],
    cookingTime: { name: "Under 30 minutes", time: 1 },
    portionSize: { quantity: "Serving", value: "1" },
    difficultyLevel: "Beginners",
    nutrition: {
      "Calories": 0,
      "Fats": 0 ,
      "Saturated Fats": 0,
      "Carbohydrates": 0,
      "Fiber": 0,
      "Sugar": 0,
      "Protein": 0 ,
      "Sodium": 0
    },
    ingredients: [],
    cookingInstructions: [],
    mealType: [],
    dieteryPreference: [],
  });

  const value = {
    defaultRecipe,
    recipe, setRecipe,
  };

  return(
    <RecipeContext.Provider value = {value}>
      {children}
    </RecipeContext.Provider>
  )
};

export default RecipeContextFunction;