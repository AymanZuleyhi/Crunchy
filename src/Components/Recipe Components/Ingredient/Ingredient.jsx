import "./Ingredient.css";

function Ingredient(props) {
  const { ingredient } = props;

  return(
    <div className="INGREDIENT">
      <div>
        <img src={`https://www.themealdb.com/images/ingredients/${ingredient.name}.png`}/>
      </div>
      <p>{ingredient.name}</p>
    </div>
  )
};

export default Ingredient;