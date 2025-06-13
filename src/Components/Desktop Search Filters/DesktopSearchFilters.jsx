import "./DesktopSearchFilters.css";
import Dropdown from "../Dropdown/Dropdown.jsx";
import Filter from "../Filter/Filter.jsx";

function DesktopSearchFilters(props) {
  const { 
    mealType, 
    dieteryPreferences, 
    allergens, 
    selectedOptions, 
    setSelectedOptions,
    screenWidth
  } = props;

  return (
    <div className="filter_container">
      <p style={{ marginLeft: "10px" }}>Filter the recipes by</p>

      <div className="filter-section">
        {screenWidth > 700 &&
          <div className="dropdowns">
            <Dropdown name={"dieteryPreferences"} text={"Dietery Preference"} options={dieteryPreferences} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <Dropdown name={"mealType"} text={"Meal Type"} options={mealType} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>
            <Dropdown name={"allergens"} text={"Allergens"} options={allergens} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
          </div>
        }
        
        <Filter 
          screenWidth={screenWidth}
          selectedOptions={selectedOptions} 
          setSelectOptions={setSelectedOptions} 
        />
      </div>
    </div>
  )
};

export default DesktopSearchFilters;