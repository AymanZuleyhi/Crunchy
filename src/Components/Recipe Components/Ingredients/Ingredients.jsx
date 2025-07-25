import "./Ingredients.css";
import { useState } from "react";
import OptionPicker from "../../Option Picker/OptionPicker";
import Ingredient from "../Ingredient/Ingredient";

function Ingredients(props) {
  const { ingredients } = props;

  const [options, setOptions] = useState([
    {name: "2", active: true},
    {name: "4", active: false},
    {name: "6", active: false}
  ])

  return(
    <div className="INGREDIENTS">
      <div className="ingredients_headline">
        <h2>Ingredients</h2>
        
        <div className="serving-size">
          <p>Serving size</p>
          <OptionPicker options={options} setOptions={setOptions} />
        </div>
      </div>
      

      <div className="ingredients_container">
        {
          ingredients.map((ingredient, i) => {
            return (
              <Ingredient options={options} ingredient={ingredient} key={ingredient._id}/>
            )
          })
        }
      </div>
    </div>
  )
};

export default Ingredients;