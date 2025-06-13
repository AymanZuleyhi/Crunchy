import "./PersonalInformationContent.css";
import { useState, useEffect } from "react";
import Input from "../../Input/Input.jsx";
import CountrySelector from "../Country Selector/CountrySelector.jsx";
import Dropdown2 from "../../Dropdown 2/Dropdown2.jsx";

function PersonalInformationContent(props) {
  const { userData, userDataCopy, setUserDataCopy, countries } = props;

  const [genders, setGenders] = useState([
    { name: "Male", active: true }, 
    { name: "Female", active: false }, 
    { name: "Other", active: true }
  ]);

  const handleNameChange = (e) => {
    setUserDataCopy((prevUserData) => ({
      ...prevUserData,
      name: e.target.value
    }));
  };

  const handleSurnameChange = (e) => {
    setUserDataCopy((prevUserData) => ({
      ...prevUserData,
      surname: e.target.value
    }));
  };

  useEffect(() => {
    setUserDataCopy((prevData) => ({
      ...prevData,
      gender: genders.find((gender) => gender.active).name
    }));
  }, [genders])

  return (
    <div className="container">
      <h2>Personal Information</h2>
      <p>Bellow you can edit your personal information such as: name, surname, gender, etc.</p>

      <div className="personal-information_container">
        <Input 
          onChange={handleNameChange} 
          value={userDataCopy.name} 
          placeholder={"Name"} 
        />

        <Input
          onChange={handleSurnameChange} 
          value={userDataCopy.surname} 
          placeholder={"Surname"} 
        />
        
        <CountrySelector 
          selectedCountry={userDataCopy.country} 
          countries={countries}
          setter={setUserDataCopy}
        />
        
        <Dropdown2 
          options={genders} 
          setOptions={setGenders}
        />
      </div>
    </div>
  )
};

export default PersonalInformationContent;