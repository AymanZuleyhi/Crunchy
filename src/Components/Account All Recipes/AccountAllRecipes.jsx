import "./AccountAllRecipes.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import RecipeBox from "../Recipe Box/RecipeBox";
import { AppContext } from "../../Context/AppContext.jsx";

function AccountAllRecipes(props) {
  const { type } = props;

  const { backendUrl, userData } = useContext(AppContext);
  const [recipes, setRecipes] = useState();

  const fetchAllRecipes = async () => {
    let info = type === "recipes"
    ? userData?.recipes.uploaded
    : userData?.recipes.favorites;

    try{
      const mappedIds = await info.map((id) => 
        axios.post(`${backendUrl}/recipe/${id}`)
      );
  
      const result = await Promise.all(mappedIds);
      const data = result.map((url) => url.data.recipe);
      setRecipes(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return(
    <div className="ACCOUNT_ALL_RECIPES">
      {
        recipes?.map((recipe) => {
          return <RecipeBox key={recipe._id} recipe={recipe}/>
        })
      }
    </div>
  )
};

export default AccountAllRecipes;