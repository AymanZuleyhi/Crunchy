import "./RecipeInformation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUtensils, faHandDots, faBowlFood } from "@fortawesome/free-solid-svg-icons";

const allergens = [
  "Peanut", "Tree Nut", "Dairy", "Egg", "Gluten", "Soy", "Shellfish", "Fish", "Sesame", "Mustard"
];

function RecipeInformation(props) {
  const { cookingTime, mealType, difficultyLevel, portionSize, ingredients } = props;

  const getAllergens = () => {
    const foundAllergens = allergens.filter(allergen =>
      ingredients.some(ingredient => {
        const ingredientName = ingredient.name.toLowerCase();
        const allergenName = allergen.toLowerCase();
        return (
          ingredientName.includes(allergenName) ||
          allergenName.includes(ingredientName)
        );
      })
    );

    const listOfAllergens = foundAllergens.map((allergen, i) =>
      `${allergen}${i !== foundAllergens.length - 1 ? " • " : ""}`
    );

    return listOfAllergens.length === 0 ? "None" : listOfAllergens;
  };

  const values = [
    {icon: faClock, title: "Cooking Time", value: cookingTime.name},
    {icon: faHandDots, title: "Type", value: mealType[0]},
    {icon: faUtensils, title: "Difficulty level", value: difficultyLevel.name},
    {icon: faHandDots, title: "Allergens", value: [getAllergens()]},
    {icon: faBowlFood, title: "Portion Size", value: `${portionSize.value} ${portionSize.quantity}`}
  ];

  return(
    <div className="container">
      {
        values.map((value, i) => {
          return (
            <div className={`information ${i % 2 === 0 ? "even" : "odd"}`} key={value.title}>
              <div className="information">
                <FontAwesomeIcon icon={value.icon}/>
                <p>{value.title}</p>
              </div>

              <div className="information-content">
                <p>{value.value}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
};

export default RecipeInformation;