import "./Description.css";
import Textarea from "../../Textarea/Textarea.jsx";
import { useState, useContext } from "react";
import { RecipeContext } from "../../../Context/RecipeContext";

function Description() {
  const { setRecipe } = useContext(RecipeContext);

  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      description: e.target.value
    }));
  };

  return(
    <div className="container">
      <h2>Description <span>*</span></h2>
      <p>Tell users what your recipe is about...</p>

      <Textarea userInput={userInput} onChange={handleUserInput}/>
    </div>
  )
};

export default Description;