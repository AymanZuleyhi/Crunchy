import "./Dropdown2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect, useContext } from "react";
import { Helpers } from "../../Context/Helpers";

function Dropdown2(props) {
  const { options, setOptions } = props;

  const { handleClickOutside } = useContext(Helpers);

  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  const togglIsActive = () => {
    setIsActive(!isActive)
  };

  useEffect(() => {
    const clickHandler = (e) => handleClickOutside(e, dropdownRef, setIsActive);

    document.addEventListener("click", clickHandler);
    
    return () => {
      removeEventListener("click", clickHandler);
    };
  }, [])

  const handleSelectOption = (option) => {
    setOptions((prevOptions) => {
      return prevOptions.map((eachOption) => {
        return eachOption.name === option.name
        ? { ...eachOption, active: true }
        : { ...eachOption, active: false }
      }); 
    });

    togglIsActive();
  };

  const getActiveOption = () => {
    const activeOption = options.find((option) => option.active);

    if(activeOption) {
      return activeOption.name;
    };
  };

  return(
    <div ref={dropdownRef} className="DROPDOWN2">

      <div onClick={togglIsActive} className={`dropdown2 ${isActive ? "active" : "not-active"}`}>
        <p>{getActiveOption()}</p>
        <FontAwesomeIcon icon={ isActive ? faChevronUp : faChevronDown }/>
      </div>

      {isActive &&
        <div className="dropdown2-options">
          {
            options.map((option) => {
              return (
                <div onClick={() => handleSelectOption(option)} key={option.name}>
                  <p>{option.name}</p>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
};

export default Dropdown2;