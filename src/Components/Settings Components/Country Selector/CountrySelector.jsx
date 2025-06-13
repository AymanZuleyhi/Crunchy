import "./CountrySelector.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";

function CountrySelector(props) {
  const { selectedCountry, countries, setter} = props;

  const [isActive, setIsActive] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState();

  const handleIsActive = () => {
    if(!isActive) {
      setFilteredCountries(countries);
    }

    setIsActive(!isActive);
  };

  const selectCountry = (country) => {
    setter((prevInfo) => ({
      ...prevInfo,
      country: country.name
    }));

    setIsActive(false);
  };

  const handleCountrySearch = (e) => {
    setFilteredCountries(() => {
      return countries?.filter((country) => {
        return country.name.toLowerCase().includes(e.target.value.toLowerCase());
      })
    });
  };

  useEffect(() => {
    setFilteredCountries(countries)
  }, [countries])

  return(
    <div className={`COUNTRY_SELECTOR ${isActive ? "active" : "not-active"}`}>
      
      <div onClick={handleIsActive} className="country-selector_dropdown">
        <img src={selectedCountry === "" ? countries[0]?.flag : countries.find((country) => country.name === selectedCountry).flag}/>
        <p>{selectedCountry === "" ? countries[0]?.name : countries.find((country) => country.name === selectedCountry).name}</p>
        <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown}/>
      </div>

      {isActive &&
        <div className="country-dropdown_container">
          <div className="country-dropdown_search">
            <FontAwesomeIcon icon={faSearch}/>
            <input onChange={handleCountrySearch} placeholder={"Search..."} />
          </div>

          <div className="border"></div>

          <div className="country-dropdown_options">
            {
              filteredCountries?.length === 0 &&
                <p>No results 😟</p>
            }
            {
              filteredCountries.map((country) => {
                return (
                  <div onClick={() => selectCountry(country)} key={country.name}>
                    <img src={country.flag}/>
                    <p>{country.name}</p>
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

export default CountrySelector;