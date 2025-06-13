import "./OptionsSelector.css";
import { useContext } from "react";
import { RecipeContext } from "../../../Context/RecipeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

function OptionsSelector(props) {
  const { recipe, setRecipe } = useContext(RecipeContext);
  const { h2, description, options, child } = props;

  const handleSelectOption = (option) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [child] : prevRecipe[child].includes(option) 
      ? prevRecipe[child].filter((eachOption) => eachOption !== option)
      : [...prevRecipe[child], option]
    }));
  };

  return (
    <div className="container">
      <h2>{h2}</h2>
      <p>{description}</p>

      <div className="options_container">
        {
          options.map((option) => {
            return (
              <div onClick={() => handleSelectOption(option)} key={option}>
                <p>{option}</p>
                <FontAwesomeIcon icon={recipe[child].includes(option) ? faSquareCheck : faSquare} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default OptionsSelector;