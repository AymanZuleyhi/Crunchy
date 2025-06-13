import "./DifficultyLevel.css";
import { useState, useContext } from "react";
import { RecipeContext } from "../../../Context/RecipeContext.jsx";

function DifficultyLevel() {
  const { setRecipe } = useContext(RecipeContext);

  const [options, setOptions] = useState([
    { name: "Beginners", difficulty: 1, active: true },
    { name: "Intermediates", difficulty: 2,  active: false },
    { name: "Professionals", difficulty: 3, active: false}
  ]);

  const changeDifficultyLevel = (option) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      difficultyLevel: { name: option.name, difficulty: option.difficulty }
    }));

    setOptions((prevOptions) => {
      return prevOptions.map((eachOption) => {
        return eachOption.name === option.name
        ? {...eachOption, active: true}
        : {...eachOption, active: false}
      })
    });
  };

  return (
    <div className="container">
      <h2>Difficulty Level</h2>
      <p>My recipe is perfect for...</p>
      
      <div className="difficulty-level_options">
        {
          options.map((option) => {
            return (
              <div onClick={() => changeDifficultyLevel(option)} className={`difficulty-button ${option.active ? "active" : "not-active"}`} key={option.name}>
                <p>{option.name}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default DifficultyLevel;