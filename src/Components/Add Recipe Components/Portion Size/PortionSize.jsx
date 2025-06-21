import "./PortionSize.css";
import { useContext } from "react";
import { RecipeContext } from "../../../Context/RecipeContext.jsx";
import Input from "../../Input/Input";

function PortionSize() {
  const { setRecipe } = useContext(RecipeContext);

  const handleInput = (e) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      portionSize: {...prevRecipe.portionSize, [e.target.name]: e.target.value}
    }));
  };

  return(
    <div className="container">
      <h2>Portion Size <span>*</span></h2>
      <p>How many people can your recipe feed?</p>

      <div className="portion-size_container">
        <Input 
          onChange={handleInput} 
          name={"quantity"} 
          placeholder={"Quantity"} 
        />

        <Input 
          onChange={handleInput} 
          name={"value"} 
          type={"number"} 
          placeholder={"1"} 
        />
      </div>
    </div>
  )
};

export default PortionSize;