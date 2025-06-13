import "./CookingStep.css";
import { useState, useContext } from "react";
import { RecipeContext } from "../../../Context/RecipeContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Input/Input.jsx";
import Button2 from "../../Button 2/Button2.jsx";

function CookingStep(props) {
  const { step, i } = props;
  const { setRecipe } = useContext(RecipeContext);
  const [edit, setEdit] = useState(false);
  const [newStepInput, setNewStepInput] = useState();

  const handleInput = (e) => {
    setNewStepInput(e.target.value);
  };

  const editStep = () => {
    if (!edit) {
      setNewStepInput(step);
    } else {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        cookingInstructions: prevRecipe.cookingInstructions.map((step, index) => {
          return index === i
          ? newStepInput 
          : step
        })
      }));
    };
    
    setEdit(!edit);
  };

  const removeCookingStep = (step, i) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      cookingInstructions: prevRecipe.cookingInstructions.filter((eachStep, eachIndex) => eachIndex !== i )
    }));
  };

  return(
    <div className="COOKING_STEP">
      {!edit &&
        <p>{`${i + 1}. ${step}`}</p>
      }

      {edit &&
        <>
          <p>{i + 1}.</p>
          <Input onChange={handleInput} value={newStepInput} />
        </>
      }
      
      <div className="cooking-step_controls">
        <Button2 
          icon={edit ? faCircleCheck : faPenToSquare}
          onClick={editStep}
          text={edit ? "Done" : "Edit"}
        />

        <Button2 
          icon={faXmark}
          onClick={(() => removeCookingStep(step, i))}
          text={"Remove"}
        />
      </div>
    </div>
  )
};

export default CookingStep;