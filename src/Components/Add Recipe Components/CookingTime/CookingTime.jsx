import "./CookingTime.css";
import { useState, useEffect, useContext } from "react";
import { RecipeContext } from "../../../Context/RecipeContext";
import Dropdown2 from "../../Dropdown 2/Dropdown2";

function CookingTime() {
  const { setRecipe } = useContext(RecipeContext);

  const [options, setOptions] = useState([
    { name: "Under 30 minutes", time: 1, active: true }, 
    { name: "30 to 60 minutes", time: 2, active: false }, 
    { name: "1 to 2 hours", time: 3, active: false }, 
    { name: "More than 2 hours", time: 4, active: false }
  ]);

  useEffect(() => {
    const selectedOption = options.find((option) => option.active);

    const { name, time } = selectedOption;

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      cookingTime: { name, time }
    }));
  }, [options])

  return (
    <div className="container">
      <h2>Cooking time</h2>
      <p>How long does your recipe take to make?</p>

      <Dropdown2 options={options} setOptions={setOptions}/>
    </div>
  )
};

export default CookingTime;