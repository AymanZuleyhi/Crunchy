import "./Dropdown.css";
import { useState, useContext, useRef, useEffect } from "react";
import { Helpers } from "../../Context/Helpers.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import FilterDropdownOption from "../Filter Dropdown Option/FilterDropdownOption.jsx";

function Dropdown(props) {
  const { name, text, options, selectedOptions, setSelectedOptions } = props;
  
  const { handleClickOutside } = useContext(Helpers);

  const dropdownRef = useRef(null);
  
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const clickHandler = (e) => handleClickOutside(e, dropdownRef, setIsActive);

    document.addEventListener("click", clickHandler);
    
    return () => {
      removeEventListener("click", clickHandler);
    };
  }, [])

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
    <div ref={dropdownRef} className="DROPDOWN">
      <div onClick={handleIsActive} className={`dropdown-selector ${isActive ? "active" : "not-active"}`}>
        <p>{text}</p>
        <FontAwesomeIcon icon={ isActive ? faChevronUp : faChevronDown }/>
      </div>

      {isActive &&
        <div className={`dropdown-options ${isActive ? "active" :"not-active"}`}>
          {
            options?.map((option) => {
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

export default Dropdown;