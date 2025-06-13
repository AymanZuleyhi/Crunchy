import "./AddToFavorites.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import HoverBox from "../../Hover Box/HoverBox.jsx";

function AddToFavorites(props) {
  const { recipeId } = props;
  const { backendUrl, userData, handleCheckAuth } = useContext(AppContext);
  const [inFavourites, setInFavourites] = useState();

  const handleAddToFavorites = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try{
      const { data } = await axios.post(`${backendUrl}/recipe/add-to-favourites/${recipeId}`, 
        {}, 
        { withCredentials: true }
      );
      
      if(data.success) {
        handleCheckAuth();
        toast(data.message);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setInFavourites(userData?.recipes.favourites.includes(recipeId) ? true : false);
  }, [userData])

  return (
    <div onClick={handleAddToFavorites} className="ADD-TO-FAVOURITES">
      <FontAwesomeIcon icon={ inFavourites ? faHeartSolid : faHeartRegular }/>
      <HoverBox text={inFavourites ? "Remove From Favourites" : "Add To Favourites"}/>
    </div>
  )
};

export default AddToFavorites;