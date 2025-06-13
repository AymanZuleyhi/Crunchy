import "./Home.css"
import assets from "../../assets/assets";
import { useState, useEffect, useContext } from "react";
import { Helpers } from "../../Context/Helpers.jsx";
import SearchBar from "../../Components/Search bar/SearchBar";
import AllRecipes from "../../Components/All Recipes/Recipes.jsx";
import DesktopSearchFilters from "../../Components/Desktop Search Filters/DesktopSearchFilters.jsx";
import MobileSearchFilters from "../../Components/Mobile Search Filters/MobileSearchFilters.jsx";

const mealType = [
  "Breakfast", "Brunch", "Lunch", "Dinner", "Snack", "Appetizer", "Main Course", "Side Dish", "Dessert", "Beverae"
];
const dieteryPreferences = [
  "Vegetarian", "Vegan", "Pescatarian", "Gluten-Free", "Keto", "Paleo", "Dairy-Free", "Low-Carb", "High-Protein", "Mediterranean"
];
const allergens = [
  "Peanuts", "Tree Nuts", "Dairy", "Eggs", "Gluten (Wheat)", "Soy", "Shellfish", "Fish", "Sesame", "Mustard"
];

function Home() {
  const { screenWidth, setShowBlackScreen } = useContext(Helpers);

  const [selectedOptions, setSelectedOptions] = useState({
    mealType: [],
    dieteryPreferences: [],
    allergens: [],
    sortBy: { name: "Rating", ascending: true }
  });

  const [filters, setFilters] = useState([]); 
  const [recipes, setRecipes] = useState([]);
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleShowMobileFilters = () => {
    setShowBlackScreen(showMobileFilters ? false : true);
    setShowMobileFilters(!showMobileFilters);
  };

  const sortRecipes = () => {
    const { name, ascending } = selectedOptions?.sortBy;

    if(selectedOptions.dieteryPreferences.length > 0) {
      setRecipes((prevRecipes) => {
        return prevRecipes.filter((recipe) => {
          return recipe.dieteryPreference.includes(selectedOptions.dieteryPreferences)
        });
      });
    };

    if(name === "Rating" && ascending) {
      setRecipes((prevRecipe) => {
        return [...prevRecipe].sort((a, b) => { 
          const avgA = a.rating.length > 0
            ? a.rating.reduce((sum, val) => sum + val, 0) /  a.rating.length
            : 0;
            
          const avgB = b.rating.length > 0
            ? b.rating.reduce((sum, val) => sum + val, 0) /  b.rating.length
            : 0;

          return avgB - avgA;
        });
      });
    };

    if(name === "Rating" && !ascending) {
      setRecipes((prevRecipe) => {
        return [...prevRecipe].sort((a, b) => { 
          const avgA = a.rating.length > 0
            ? a.rating.reduce((sum, val) => sum + val, 0) /  a.rating.length
            : 0;
            
          const avgB = b.rating.length > 0
            ? b.rating.reduce((sum, val) => sum + val, 0) /  b.rating.length
            : 0;

          return avgA - avgB;
        });
      });
    };

    if(name === "Rating" && !ascending) {
      setRecipes((prevRecipe) => {
        return [...prevRecipe].sort((a, b) => b.rating.reduce((sum, val) => sum + val, 0) /  b.rating.length - a.rating.reduce((sum, val) => sum + val, 0) /  a.rating.length)
      })
    };

    if(name === "Difficulty" && ascending) {
      setRecipes((prevRecipe) => {
        return [...prevRecipe].sort((a, b) => a.difficultyLevel.difficulty - b.difficultyLevel.difficulty);
      })
    };

    if(name === "Difficulty" && !ascending) {
      setRecipes((prevRecipe) => {
        return [...prevRecipe].sort((a, b) => b.difficultyLevel.difficulty - a.difficultyLevel.difficulty);
      })
    };

    if(name === "Preparation Time" && ascending) {
      setRecipes((prevRecipe) => {
        return [...prevRecipe].sort((a, b) => a.cookingTime.time - b.cookingTime.time);
      });
    };

    if(name === "Preparation Time" && !ascending) {
      setRecipes((prevRecipe) => {
        return [...prevRecipe].sort((a, b) => b.cookingTime.time - a.cookingTime.time);
      });
    };

    if(name === "Calories" && ascending) {
      setRecipes((prevRecipe) => {
        return [...prevRecipe].sort((a, b) => a.nutrition.Calories - b.nutrition.Calories);
      })
    };

    if(name === "Calories" && !ascending) {
      setRecipes((prevRecipe) => {
        return [...prevRecipe].sort((a, b) => b.nutrition.Calories - a.nutrition.Calories);
      });
    };
  };

  useEffect(() => {
    if(screenWidth > 700) {
      setShowBlackScreen(false);
      setShowMobileFilters(false);
    }
  }, [screenWidth])

  return (
    <div className="HOME">
      <div className="hero">
        <img src={assets.lemon}/>
        <h1>Find Your Next Favorite Recipe</h1>
        <h2>Easy, Delicious Meals for Every Occasion</h2>
        <img src={assets.hero}/>
      </div>

      <SearchBar 
        filters={filters} 
        setFilters={setFilters}
        handleShowMobileFilters={handleShowMobileFilters}
        screenWidth={screenWidth}
      />

      <DesktopSearchFilters 
        mealType={mealType} 
        dieteryPreferences={dieteryPreferences} 
        allergens={allergens}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        screenWidth={screenWidth}
      />

      {showMobileFilters &&
        <MobileSearchFilters 
          mealType={mealType}
          dieteryPreferences={dieteryPreferences}
          allergens={allergens}
          handleShowMobileFilters={handleShowMobileFilters}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          screenWidth={screenWidth}
          setShowMobileFilters={setShowMobileFilters}
          sortRecipes={sortRecipes}
        />
      }
      
      <AllRecipes 
        selectedOptions={selectedOptions} 
        filters={filters}
        screenWidth={screenWidth}
        recipes={recipes}
        setRecipes={setRecipes}
        sortRecipes={sortRecipes}
      />
    </div>
  )
}

export default Home;