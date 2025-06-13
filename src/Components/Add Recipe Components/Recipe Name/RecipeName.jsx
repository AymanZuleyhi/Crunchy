import "./RecipeName.css";
import { useContext } from "react";
import { RecipeContext } from "../../../Context/RecipeContext.jsx";
import Input from "../../Input/Input.jsx";

function RecipeName() {
  const { setRecipe } = useContext(RecipeContext);

  const handleInput = (e) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipeName: e.target.value
    }));
  };

  return(
    <div className="container">
      <h2>Recipe name <span>*</span></h2>
      <p>Write the name of your recipe.</p>
      <Input placeholder={"Your recipe name"} onChange={handleInput} />
    </div>
  )
};

export default RecipeName;