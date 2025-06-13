import "./Recipes.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../Context/AppContext.jsx";
import { Helpers } from "../../Context/Helpers.jsx";
import RecipeBox from "../Recipe Box/RecipeBox.jsx";
import Button from "../Button/Button.jsx";

function Recipes(props) {
  const { 
    type, 
    filters, 
    selectedOptions, 
    user, 
    recipes,
    setRecipes,
    sortRecipes
  } = props;

  const { backendUrl, userData, handleCheckAuth } = useContext(AppContext);
  const { screenWidth } = useContext(Helpers);

  const location = useLocation().pathname;

  const [allRecipesLength, setAllRecipesLength] = useState();
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    setLimit(6);
   }, [])

  const handleShowMoreRecipes = () => {
    setLimit(limit + 6);
  };

  const getAllRecipes = async () => {
    const url = `${backendUrl}/recipe/all-recipes?limit=${limit}&skip=${skip}`;
    
    try {
      const { data } = await axios.get(url);

      if(data.success) {
        setRecipes(data.recipes);
        setAllRecipesLength(data.allRecipesLength);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  const fetchRecipesById = async (recipeIds) => {
    let recipesType = type === "uploads" ? "uploaded" : "favourites";

    const url = `${backendUrl}/recipe/get-multiple-recipes-by-id/${recipesType}`;

    try {
      const { data } = await axios.post(url,
        { recipeIds: recipeIds },
        { withCredentials: true }
      );

      if(data.success) {
        setRecipes(data.recipes);
        handleCheckAuth();
      };
    } catch(error) {
      console.error(error.message);
    };
  };

  useEffect(() => {
    if(location === "/") {
      getAllRecipes(); 
    };
  }, [limit, filters])

  useEffect(() => {
    if(location !== "/" && (type === "uploads" || type === "favourites")) {
      fetchRecipesById(type === "uploads" ? user.recipes.uploaded : user.recipes.favourites);
    };
  }, [userData])

  useEffect(() => {
    if(location !== "/" && type === "favourites") {
      fetchRecipesById();
    };
  }, [userData])

  // Handle the filtering logic for the recipes.
  useEffect(() => {
    if(location == "/" && screenWidth > 700) {
      sortRecipes();
    };
  }, [selectedOptions])

  return(
    <div className={`ALL_RECIPES ${recipes?.length === 0 ? "empty" : "not-empty"}`}>
      <div className={`all-recipes_container ${recipes?.length === 0 ? "empty" : "not-empty"}`}>
        {recipes?.length === 0 && user &&
          <p>{`${type === "uploads" 
            ? `${user?._id === userData._id ? "You haven't" : "The user hasen't"} uploaded any recipes.` 
            : `${user?._id === userData._id ? "You haven't" : "The user hasen't"} added any recipes to favourites.` 
          }`}</p>
        }

        {
          recipes?.map((recipe) => {
            return (
              <RecipeBox key={recipe._id} recipe={recipe} />
            )
          })
        }
      </div>

      {recipes?.length !== 0 && (recipes.length < allRecipesLength) &&
        <Button 
          isValid={recipes.length < allRecipesLength } 
          onClick={() => handleShowMoreRecipes()} 
          text={"Show More"}
        />
      }

      {recipes.length === allRecipesLength &&
        <p style={{ textAlign: "center" }}>There are no more recipes to show.</p>
      }
    </div> 
  )
};

export default Recipes;