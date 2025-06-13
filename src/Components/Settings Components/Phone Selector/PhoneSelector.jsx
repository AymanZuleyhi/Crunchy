import "./PhoneSelector.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";

function PhoneSelector(props) {
  const { selectedPhoneNumber, countries, userDataCopy, setUserDataCopy } = props;

  const [isActive, setIsActive] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState();

  const handlePhoneNumberInput = (e) => {
    setUserDataCopy((prevUserData) => ({
      ...prevUserData,
      phone: { ...prevUserData.phone, number: e.target.value }
    }));
  };

  const handleIsActive = () => {
    if(!isActive) {
      setFilteredCountries(countries);
    }

    setIsActive(!isActive);
  };

  const selectCountry = (country) => {
    setUserDataCopy((prevUserData) => ({
      ...prevUserData,
      phone: { country: country.name, number: "" }
    }));

    setIsActive(false);
  };

  const handleCountrySearch = (e) => {
    setFilteredCountries(() => {
      return countries?.filter((country) => {
        return country.name.toLowerCase().includes(e.target.value.toLowerCase()) || country?.phoneCode?.includes(e.target.value);
      })
    });
  };

  return(
    <div className={`PHONE-NUMBER_SELECTOR ${isActive ? "active" : "not-active"}`}>
      <div onClick={handleIsActive} className="country-code_dropdown">
        <img src={selectedPhoneNumber.country === "" ? countries[0]?.flag : countries.find((country) => country.name === selectedPhoneNumber.country).flag}/>
        <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown}/>
      </div>

      <div className="phone-number-input_container">
        <p>{selectedPhoneNumber.country === "" ? countries[0]?.phoneCode : countries.find((country) => country.name === selectedPhoneNumber.country).phoneCode}</p>
        
        <input 
          value={userDataCopy.phone.number} 
          onChange={handlePhoneNumberInput} 
          className="" 
          type={"number"}
        />
      </div>

      {isActive &&
        <div className="phone-number-dropdown_container">
          
          <div className="phone-number-dropdown_search">
            <FontAwesomeIcon icon={faSearch}/>
            <input onChange={handleCountrySearch} placeholder={"Search..."}/>
          </div>
          
          <div className="border"></div>

          <div className="phone-number-dropdown_options">
            {
              filteredCountries?.length === 0 &&
                <p>No results 😟</p>
            }
            {
              filteredCountries?.map((country) => {
                return (
                  <div onClick={() => selectCountry(country)} key={country.name}>
                    <img src={country.flag}/>
                    <p>{`${country.name} (${country.phoneCode})`}</p>
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

export default PhoneSelector;