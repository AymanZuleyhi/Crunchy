import "./AddInstruction.css";
import { useState, useContext } from "react";
import { RecipeContext } from "../../../Context/RecipeContext.jsx";
import Input from "../../Input/Input.jsx";
import Button from "../../Button/Button.jsx";
import ShowMore from "../../Show More/ShowMore.jsx";
import ClickableText from "../../Clickable Text/ClickableText.jsx";
import CookingStep from "../Cooking Step/CookingStep.jsx";

function AddInstruction() {
  const {recipe, setRecipe} = useContext(RecipeContext);
  const [step, setStep] = useState("");
  const [showCookingSteps, setShowCookingSteps] = useState(true);

  const handleInput = (e) => {
    setStep(e.target.value);
  };

  const handleShowCookingSteps = () => {
    setShowCookingSteps(!showCookingSteps);
  };

  const addCookingStep = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      cookingInstructions: [...prevRecipe.cookingInstructions, step]
    }));

    setStep("");
  };

  const removeAllCookingSteps = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      cookingInstructions: []
    }));
  };

  return (
    <div className="container">
      <h2>Cooking instructions <span>*</span></h2>
      <p>Add all of the cooking steps.</p>

      <div className="add-cooking-step">
        <Input onChange={handleInput} value={step} placeholder={`Step ${recipe.cookingInstructions.length + 1}`} />
        <Button type={"button"} isValid={step.trim().length !== 0} text={"Add"} onClick={addCookingStep} />
      </div>

      <ShowMore text={"Cooking Step"} items={recipe.cookingInstructions} show={showCookingSteps} setterFunction={handleShowCookingSteps} />

      {recipe.cookingInstructions.length > 0 && showCookingSteps &&
        <div className="cooking-steps_container">
          {
            recipe.cookingInstructions.map((step, i) => {
              return (
                <CookingStep key={step} step={step} i={i} />
              )
            })
          }
        </div>
      }

      {recipe.cookingInstructions.length !== 0 &&
        <ClickableText text={"Remove all cooking instructions"} onClick={removeAllCookingSteps} />
      }
    </div>
  )
};

export default AddInstruction;