import "./Ingredient.css";
import { useState, useContext } from "react";
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
  const [userInput, setUserInput] = useState(ingredient.weight);

  const [options, setOptions] = useState([
    {name: "oz", active: true}, 
    {name: "g", active: false}
  ]);

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleEdit = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.map((eachIngredient) => {
        return eachIngredient.name === ingredient.name
        ? {...ingredient, unit: userInput === "" ? "" : options.find((option) => option.active).name, weight: userInput }
        : eachIngredient
      })
    }));

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
          <OptionPicker 
            options={options}
            setOptions={setOptions}
          />
          
          <Input 
            placeholder={"Add weight"} 
            type={"number"} 
            onChange={handleInput}
            value={userInput}
          />
        </div>
      }

      <div className="ingredient_controls">
        <Button2 
          onClick={handleEdit} 
          icon={edit ? faCheckCircle : faWeightScale}
          text={edit ? "Done" : "Edit"}
          isValid={(edit && userInput.trim().length !== 0) || !edit}
          type={"button"}
        />

        <Button2 
          onClick={edit 
            ? () => setEdit(false)
            : () => removeIngredient(ingredient.name)
          } 
          icon={faClose} 
          text={edit ? "Cancel" : "Remove"}
          type={"button"}
        />
      </div>
    </div>
  )
};

export default Ingredient;