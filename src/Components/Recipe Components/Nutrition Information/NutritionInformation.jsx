import "./NutritionInformation.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Button2 from "../../Button 2/Button2";

function NutritionInformation(props) {
  const { nutrition, handleShowNutritionInfo } = props;

  return(
    <div className="NUTRITION_INFORMATION">
      <div className="nutrition-information_headline">
        <h2>Nutrition</h2>
        <Button2 onClick={handleShowNutritionInfo} icon={faClose} text={"Close"}/>
      </div>

      <div className="all-nutrients">
        {
          Object.entries(nutrition).map(([key, value] , i) => {
            return (
                <div className={`nutrient ${i%2===0 ? "even" : "odd"}`} key={`${key + value}`}>
                  <p>{key}</p>
                  <p>{value}</p>
                </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default NutritionInformation;