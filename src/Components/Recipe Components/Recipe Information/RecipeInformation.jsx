import "./RecipeInformation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUtensils, faHandDots, faBowlFood } from "@fortawesome/free-solid-svg-icons";

const allergens = [
  "Milk",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree nuts",
  "Peanut",
  "Wheat",
  "Soy",
  "Sesame",
  "Gluten",
  "Mustard",
  "Lupin",
  "Celery",
  "Sulphites",
  "Molluscs"
];

function RecipeInformation(props) {
  const { cookingTime, mealType, difficultyLevel, portionSize, ingredients } = props;

  const getAllergens = () => {
    const foundAllergens = allergens.filter(allergen =>
      ingredients.some(ingredient =>
        ingredient.name.toLowerCase().includes(allergen.toLowerCase())
      )
    );

    return foundAllergens.map((allergen, i) =>
      `${allergen} ${i !== foundAllergens.length - 1 ? "•" : ""} `
    );
  };

  const values = [
    {icon: faClock, title: "Cooking Time", value: cookingTime.name},
    {icon: faHandDots, title: "Type", value: mealType[0]},
    {icon: faUtensils, title: "Difficulty level", value: difficultyLevel.name},
    {icon: faHandDots, title: "Allergens", value: getAllergens()},
    {icon: faBowlFood, title: "Portion Size", value: `${portionSize.quantity} ${portionSize.value}`}
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