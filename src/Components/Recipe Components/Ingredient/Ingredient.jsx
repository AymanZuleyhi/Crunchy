import "./Ingredient.css";

function Ingredient(props) {
  const { ingredient, options } = props;
  
  const handleIngredientWeight = () => {
    const servingSize = Number(options.find((option) => option.active).name);

    if(servingSize === 2) {
      return ingredient.weight;
    } else {
      return ingredient.weight * servingSize;
    };
  };

  return(
    <div className="INGREDIENT">
      <div className="ingredient-picture">
        <img src={`https://www.themealdb.com/images/ingredients/${ingredient.name}.png`}/>
      </div>

      <div className="ingredient-content">
        <p>{ingredient.name}</p>

        {ingredient.weight !== "" &&
          <p>{`${handleIngredientWeight()} ${ingredient.unit}`}</p>
        }
      </div>
    </div>
  )
};

export default Ingredient;