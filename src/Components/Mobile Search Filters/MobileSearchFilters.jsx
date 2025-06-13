import "./MobileSearchFilters.css";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import Button2 from "../Button 2/Button2";
import Button from "../Button/Button";
import MobileDropdown from "../Mobile Dropdown/MobileDropdown";

function MobileSearchFilters(props) {
  const { 
    mealType, 
    dieteryPreferences, 
    allergens, 
    selectedOptions, 
    handleShowMobileFilters, 
    setSelectedOptions,
    sortRecipes
  } = props;

  const dropdownRef = useRef(null);

  const [hasActiveFilters, setHasActiveFilters] = useState("nothing-selected");

  const checkValidity = () => {
    if(
      selectedOptions.allergens.length === 0 && 
      selectedOptions.dieteryPreferences.length === 0 && 
      selectedOptions.mealType.length === 0
    ) {
      setHasActiveFilters("nothing-selected");
    } else {
      setHasActiveFilters("clear");
    }
  };

  const resetFilters = () => {
    setSelectedOptions({
      mealType: [],
      dieteryPreferences: [],
      allergens: [],
      sortBy: { name: "Rating", ascending: true }
    });

    handleShowMobileFilters();
  };

  useEffect(() => {
    checkValidity();
  }, [selectedOptions])

  return (
    <div ref={dropdownRef} className="MOBILE-FILTERS">
      <div className="mobile-filters_headline">
        <h2>Sort</h2>
        <Button2 text={"Close"} icon={faX} onClick={handleShowMobileFilters}/>
      </div>

      <div className="mobile-filters_body">
        <MobileDropdown 
          name={"dieteryPreferences"} 
          text={"Dietery Preferences"}
          options={dieteryPreferences}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />

        <MobileDropdown 
          name={"mealType"} 
          text={"Meal type"}
          options={mealType}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />

        <MobileDropdown 
          name={"allergens"} 
          text={"Allergens"}
          options={allergens}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>

      <div className="mobile-filters_controls">
        <Button 
          text={"Clear all"} 
          onClick={resetFilters} 
          type={hasActiveFilters}
        />

        <Button 
          text={"Search"} 
          onClick={() => {sortRecipes(), handleShowMobileFilters()}}
          type={hasActiveFilters === "nothing-selected"? "invalid" : "valid"}
        />
      </div>
    </div>
  )
};

export default MobileSearchFilters;