import "./RecipeBox.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import AddToFavourites from "../../Components/Recipe Components/Add to Favorites/AddToFavorites.jsx";
import Button2 from "../Button 2/Button2.jsx";

import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { AppDataContext } from "../../Context/AppDataContext.jsx";
import { Helpers } from "../../Context/Helpers.jsx";

function RecipeBox(props) {
  const { recipe } = props;
  const { images, mealType, recipeName, _id } = recipe;

  const location = useLocation().pathname.split("/")[1];

  const { userData, handleCheckAuth } = useContext(AppContext);
  const { handleAddToFavorites } = useContext(AppDataContext);
  const { page } = useContext(Helpers);

  const navigate = useNavigate();

  const handleRecipeClick = () => {
    navigate(`/recipe/${_id}`);
  };

  return(
    <div onClick={handleRecipeClick} className="RECIPE_BOX">
      <img src={images[0]?.url} />

      <div className="recipe-box_content">
        <div className="recipe-box_headline">
          <p>{recipeName}</p>

          {location === "account" &&
            <Button2 
              icon={userData.recipes.favourites.includes(_id) ? faHeartSolid : faHeartRegular} 
              text={userData.recipes.favourites.includes(_id) ? "Remove From Favourites" : "Add To Favourites"}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToFavorites(e, handleCheckAuth, _id);
              }}
            />
          }

        </div>

        <div className="recipe-type_container">
          {
            mealType.map((type) => {
              return <p key={type}>{type}</p>
            })
          }
        </div>

      </div>

    </div>
  )
};

export default RecipeBox;