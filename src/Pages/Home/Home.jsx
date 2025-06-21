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
  "Peanut", "Tree Nut", "Dairy", "Egg", "Gluten", "Soy", "Shellfish", "Fish", "Sesame", "Mustard"
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
  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleShowMobileFilters = () => {
    setShowBlackScreen(showMobileFilters ? false : true);
    setShowMobileFilters(!showMobileFilters);
  };

  const sortRecipes = (value) => {
    const { mealType, dieteryPreferences, allergens } = selectedOptions;
    const { name, ascending } = selectedOptions?.sortBy;

    if(value === "clear") {
      setSelectedOptions({
        mealType: [],
        dieteryPreferences: [],
        allergens: [],
        sortBy: { name: "Rating", ascending: true }
      });

      handleShowMobileFilters();
      setRecipes(originalRecipes);
      return;
    };

    // If no filters are selected, show all of the recipes.
    if(
        mealType.length === 0 && 
        dieteryPreferences.length === 0 && 
        allergens.length === 0
      ) {
        setRecipes(originalRecipes);
    };

    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => {
        let shouldInclude = true;

        if (
          filters.length !== 0 &&
          !filters.every(filterIngredient =>
            recipe.ingredients.some(ingredient =>
              ingredient.name.toLowerCase() === filterIngredient.toLowerCase()
            )
          )
        ) {
          shouldInclude = false;
        }

        if (
          mealType.length !== 0 &&
          !mealType.every((type) => recipe.mealType.includes(type))
        ) {
          shouldInclude = false;
        }

        if (
          dieteryPreferences.length !== 0 &&
          !dieteryPreferences.every((pref) =>
            recipe.dieteryPreference.includes(pref)
          )
        ) {
          shouldInclude = false;
        }

        if (
          allergens.length !== 0 &&
          allergens.some(allergen =>
            recipe.ingredients.some(ingredient =>
              ingredient.name.toLowerCase().includes(allergen.toLowerCase())
            )
          )
        ) {
          shouldInclude = false;
        }

        return shouldInclude;
      })
    );

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

  useEffect(() => {
    sortRecipes();
  }, [filters])

  useEffect(() => {
    sortRecipes();
  }, [selectedOptions.sortBy])

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
        originalRecipes={originalRecipes} setOriginalRecipes={setOriginalRecipes}
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