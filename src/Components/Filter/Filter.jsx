import "./Filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faArrowUp, faArrowDown, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { useState, useRef, useEffect, useContext } from "react";
import { Helpers } from "../../Context/Helpers";

function Filter(props) {
  const { setSelectOptions, screenWidth } = props;

  const { handleClickOutside } = useContext(Helpers);

  const filterRef = useRef(null);

  const [isActive, setIsActive] = useState();

  const [categories, setCategories] = useState([
    {name: "Rating", status: true},
    {name: "Difficulty", status: false},
    {name: "Preparation Time", status: false},
    {name: "Calories", status: false}
  ]);

  const [sortBy, setSortBy] = useState([
    {name: "Ascending", icon: "up", status: true},
    {name: "Descending", icon: "down", status: false}
  ]);

  const handleIsActive = () => {
    setIsActive(!isActive);
  };

  const handleSelectCategory = (eachCategory) => {
    setCategories((prevCategories) => {
      return prevCategories.map((category) => {
        return category.name === eachCategory.name
        ? {...category, status: true}
        : {...category, status: false}
      })
    });

    setSelectOptions((prevOptions) => ({
      ...prevOptions,
      sortBy: {...prevOptions.sortBy, name: eachCategory.name}
    }));
  };

  const handleSortBy = (sort) => {
    setSortBy((prevSortBy) => {
      return prevSortBy.map((sortingOption) => {
        return sortingOption.name === sort.name
        ? {...sortingOption, status: true}
        : {...sortingOption, status: false}
      });
    });

    setSelectOptions((prevOptions) => ({
      ...prevOptions,
      sortBy: 
      {
        ...prevOptions.sortBy, 
        ascending: sort.name === "Ascending" ? true : false 
      } 
    }));
  };

  // Close the box if the user clicks outside.
  useEffect(() => {
    const clickHandler = (e) => handleClickOutside(e, filterRef, setIsActive);

    document.addEventListener("click", clickHandler);
    
    return () => {
      removeEventListener("click", clickHandler);
    };
  }, [])

  return(
    <div ref={filterRef} className="FILTER">
      <div onClick={handleIsActive} className={`filter-selector ${isActive ? "active" : "not-active"}`}>
        <p>Sort</p>
        <FontAwesomeIcon icon={faSort}/>
      </div>

      {isActive &&
        <div className={`filter-options ${screenWidth > 700 ? "pc" : "mobile"}`}>
          <div className="sorting-options_container">
            {
              categories.map((eachCategory) => {
                return (
                  <div onClick={() => handleSelectCategory(eachCategory)} key={eachCategory.name}>
                    <p>{eachCategory.name}</p>
                    <FontAwesomeIcon icon={eachCategory.status ? faSquareCheck : faSquare} />
                  </div>
                )
              })
            }
          </div>

          <div className="line"></div>

          <div className="sort-by">
            {
              sortBy.map((sort) => {
                return (
                  <div onClick={() => handleSortBy(sort)} key={sort.name} className={`sorting-option ${sort.status ? "active" : "not-active"}`}>
                    <p>{sort.name}</p>
                    <FontAwesomeIcon icon={sort.icon === "up" ? faArrowUp : faArrowDown}/>
                  </div>
                )
              })
            }
          </div>

        </div>
      }
    </div>
  )
};

export default Filter;