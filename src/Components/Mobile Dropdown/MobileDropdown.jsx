import "./MobileDropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FilterDropdownOption from "../Filter Dropdown Option/FilterDropdownOption";

function MobileDropdown(props) {
  const { name, text, options, selectedOptions, setSelectedOptions } = props;

  const [isActive, setIsActive] = useState(false);

  const handleIsActive = () => {
    setIsActive(!isActive);
  };

  const selectOption = (option) => {
    // Spread the selectedOptions and tagret the spesific property. Check if the option exists in the property. If it does, remove it, if it doesn't, add it.
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [name]: prevSelectedOptions[name].includes(option)
      ? prevSelectedOptions[name].filter((eachOption) => eachOption !== option)
      : [...prevSelectedOptions[name], option]
    }));
  };

  return (
    <div className="MOBILE-DROPDOWN">
      <div onClick={handleIsActive} className="mobile-dropdown_headline">
        <p>{text}</p>
        <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown}/>
      </div>
      
      {isActive &&
        <div>
          {
            options.map((option) => {
              return (
                <FilterDropdownOption 
                  key={option} 
                  name={name}
                  option={option} 
                  onClick={selectOption}
                  selectedOptions={selectedOptions}
                />
              )
            })
          }
        </div>
      }
    </div>
  )
};

export default MobileDropdown;