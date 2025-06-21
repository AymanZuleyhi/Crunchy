import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX, faArrowUpShortWide  } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { IngredientsContext } from "../../Context/IngredientsContext.jsx";
import SearchBarFilters from "../Search Bar Filters/SearchBarFilters.jsx";
import Button2 from "../Button 2/Button2.jsx";
import SearchBarDropdown from "../Search Bar Dropdown/SearchBarDropdown.jsx";

function SearchBar(props) {
  const { 
    filters, 
    setFilters, 
    screenWidth, 
    handleShowMobileFilters
  } = props;

  const { 
    originalIngredients, 
    ingredients, 
    setIngredients, 
    filteredIngredients, 
    setFilteredIngredients 
  } = useContext(IngredientsContext);

  const [userInput, setUserInput] = useState();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(userInput?.length !== 0 ? true : false);
  }, [userInput])

  let debounceTimer
  const handleInput = (e) => {
    setUserInput(e.target.value);

    // Reset the timer.
    clearTimeout(debounceTimer);

    // Update the state if 0.5s have passed.
    debounceTimer = setTimeout(() => {
      setFilteredIngredients(() => {
        return ingredients?.filter((ingredient) => ingredient?.toLowerCase().includes(e.target.value.toLowerCase()));
      });
    }, 500)
  };

  const clearInput = () => {
    setUserInput("");
  };

  const addFilters = (e) => {
    const ingredient = e.target.textContent;

    // Add the ingredient to the filters.
    setFilters((prevFilters) => [...prevFilters, ingredient]);

    // Filter filteredIngredients so it doesn't show the added ingredient.
    setFilteredIngredients((prevFilteredIngredients) => {
      return prevFilteredIngredients.filter((eachIngredient) => eachIngredient !== ingredient);
    });

    setIngredients((prevIngredients) => {
      return prevIngredients.filter((eachIngredient) => eachIngredient !== ingredient);
    });

    setUserInput("");
  };

  const removeFilter = (selectedFilter) => {
    setFilters((prevFilters) => {
      return prevFilters.filter((filter) => filter !== selectedFilter)
    });

    setFilteredIngredients((prevIngredients) => [...prevIngredients, selectedFilter]);
    setIngredients((prevIngredients) => [...prevIngredients, selectedFilter]);
  };

  const removeAllFilters = () => {
    setIngredients(originalIngredients);
    setFilteredIngredients(ingredients);
    setFilters([]);
  };
  
  useEffect(() => {
    setIngredients(originalIngredients);
  }, [])
  
  return (
    <div className={`SEARCH-BAR ${screenWidth > 700 ? "mobile" : "desktop"}`}>
      
      <div className="search-bar-and-filters">
              <div className={`search-bar_container ${userInput?.length === 0 || userInput === undefined ? "not-active" : "active"}`}>
        <div className="search-bar">
          <FontAwesomeIcon icon={faMagnifyingGlass} />

          <input onInput={handleInput} value={userInput} placeholder={"Enter your favorite ingredient"}/>
          
          {userInput?.length > 0 &&
            <Button2 text={"Clear"} icon={faX} onClick={clearInput}/>
          }
        </div>

        {userInput !== "" && userInput?.length > 0 && isActive &&
          <SearchBarDropdown 
            filteredIngredients={filteredIngredients}
            addFilters ={addFilters }
          />
        }
      </div>

      {screenWidth < 700 &&
        <Button2 
          icon={faArrowUpShortWide} 
          text={"Filter"} 
          onClick={handleShowMobileFilters}
        />
      }
      </div>

      {
        filters.length !== 0 &&
          <SearchBarFilters 
            filters={filters} 
            removeAllFilters={removeAllFilters} 
            removeFilter={removeFilter}
          />
      }
    </div>
  )
};

export default SearchBar;