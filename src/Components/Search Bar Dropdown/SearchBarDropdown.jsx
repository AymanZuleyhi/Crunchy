import "./SearchBarDropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function SearchBarDropdown(props) {
  const { filteredIngredients, addFilters  } = props;

  return (
    <div className="search-bar_dropdown_container">
      <div className="filtered-ingredients_dropdown">
        <>
          {
            filteredIngredients?.length === 0 && 
            <div>
              <FontAwesomeIcon icon={faCircleCheck}/>
              <p style={{ cursor: "default" }}>No ingredients match your search.</p>
            </div>
          }
          {
            filteredIngredients?.length !== 0 &&
            filteredIngredients?.map((ingredient) => {
              return (
                <div onClick={addFilters} key={ingredient} className="dropdown-option">
                  <img src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}/>
                  <p>{ingredient}</p>
                </div>
              )
            })
          }
        </>
      </div>

      <p style={{ width: "90%"}} className="small-text">Recipes are filtered dynamically based on your selected ingredients.</p>
    </div>
  )
};

export default SearchBarDropdown;