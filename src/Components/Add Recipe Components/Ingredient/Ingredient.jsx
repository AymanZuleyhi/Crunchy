import "./Ingredient.css";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faWeightScale, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { RecipeContext } from "../../../Context/RecipeContext.jsx";
import { IngredientsContext } from "../../../Context/IngredientsContext.jsx";
import Input from "../../Input/Input.jsx";
import OptionPicker from "../../Option Picker/OptionPicker.jsx";
import Button2 from "../../Button 2/Button2.jsx";

function Ingredient(props) {
  const { ingredient } = props;

  const { setRecipe } = useContext(RecipeContext);
  const { setIngredients, setFilteredIngredients } = useContext(IngredientsContext);

  const [edit, setEdit] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [unit, setUnit] = useState("oz");

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleEdit = () => {
    if(edit) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: prevRecipe.ingredients.map((eachIngredient) => {
          return eachIngredient.name === ingredient.name
          ? {...ingredient, unit: userInput === "" ? "" : unit, weight: userInput }
          : eachIngredient
        })
      }));
    } else {
      setUserInput("");
    };

    setEdit(!edit);
  };

  const removeIngredient = (ingredient) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.filter((eachIngredient) => eachIngredient.name !== ingredient)
    })); 
    
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    setFilteredIngredients((prevFilteredIngredients) => [...prevFilteredIngredients, ingredient]);
  };

  return(
    <div className="ADD_RECIPE_INGREDIENT">
      {!edit &&
        <div className="ingredient_information">
          <img src={`https://www.themealdb.com/images/ingredients/${ingredient.name}.png`}/>
          <p>{`${ingredient.name} ${ingredient.weight ? ` - ${ingredient.weight}` : ""} ${ingredient.unit ? ingredient.unit : ""}`}</p>
        </div>
      }

      {edit &&
        <div className="edit-ingredient">
          <OptionPicker setUnit={setUnit} options={[{name: "oz", active: true}, {name: "g", active: false}]} />
          <Input placeholder={"Add weight"} type={"number"} onChange={handleInput}/>
        </div>
      }

      <div className="ingredient_controls">
        <Button2 
          onClick={handleEdit} 
          icon={edit ? faCheckCircle : faWeightScale}
          text={edit ? "Done" : "Edit"}
          isValid={(edit && userInput.trim().length !== 0) || !edit}
        />

        <Button2 
          onClick={edit 
            ? () => setEdit(false)
            : () => removeIngredient(ingredient.name)
          } 
          icon={faClose} 
          text={edit ? "Cancel" : "Remove"}
        />
      </div>
    </div>
  )
};

export default Ingredient;