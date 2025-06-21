import "./Nutrition.css";
import { useState, useContext } from "react";
import { RecipeContext } from "../../../Context/RecipeContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Components/Button/Button.jsx";
import Input from "../../Input/Input.jsx";
import ClickableText from "../../Clickable Text/ClickableText.jsx";

function Nutrition() {
  const { recipe, setRecipe } = useContext(RecipeContext);

  const [macronutrient, setMacronutrient] = useState({
    name: "", 
    value: 0
  });

  const handleInput = (e) => {
    setMacronutrient((prevMacronutrient) => ({
      ...prevMacronutrient,
      [e.target.name] : e.target.value
    }));
  };
  
  const handleMacroValue = (macro, e) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      nutrition: 
      {
        ...prevRecipe.nutrition, 
        [macro]: e.target.value
      }
    }));
  };

  const addMacronutrient = (e) => {
    e.preventDefault();

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      nutrition: 
      { 
        ...prevRecipe.nutrition, 
        [macronutrient.name]: macronutrient.value 
      }
    }));

    // Reset the inputs.
    setMacronutrient({ name: "", value: 0 });
  };

  const removeSingleMacronutrient = (macro) => {
    setRecipe((prevRecipe) => {
      const { [macro]:_, ...rest } = prevRecipe.nutrition;

      return {
        ...prevRecipe,
        nutrition: rest
      };
    });
  };

  const removeAllMacronutrients = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      nutrition: {}
    }));
  };

  return (
    <div className="container">
      <h2>Nutrition (Optional)</h2>

      <p>Add your own macronutrient.</p>
      
      <div className="add-macronutrient">
        <div className="add-macronutrient_inputs">
          <Input 
            type={"text"} 
            name={"name"} 
            onChange={handleInput} 
            placeholder={"Calories"} 
            value={macronutrient.name} 
          />

          <Input 
            type={"number"} 
            name={"value"} 
            onChange={handleInput} 
            value={macronutrient.value} 
          />
        </div>

        <Button 
          type={ macronutrient.name.trim().length === 0 || (macronutrient.value === 0 || macronutrient.value.trim().length === 0) ? "invalid" : "valid" }
          onClick={addMacronutrient} 
          text={"Add"}
        />
      </div>

      <p>Add a value to each macronutrient.</p>
      
      <div className="all-macronutrients">
        {

          Object.entries(recipe.nutrition).map(([key, value]) => {
            return (
              <div className="macro-box" key={key}>
                <p>{key}</p>
                <Input onChange={(e) => handleMacroValue(key, e)} type={"number"} value={value} />

                <div onClick={() => removeSingleMacronutrient(key)}>
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
            )
          })
        }
      </div>

      {recipe.nutrition.length !== 0 &&
        <ClickableText text={"Remove all macronutrients"} onClick={removeAllMacronutrients} />
      }
    </div>
  )
};

export default Nutrition;