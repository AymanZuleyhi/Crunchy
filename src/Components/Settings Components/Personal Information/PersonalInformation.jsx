import "./PersonalInformation.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../../Button/Button.jsx";
import PersonalInformationContent from "../Personal Information Content/PersonalInformationContent.jsx";
import ContactInformation from "../Contact Information/ContactInformation.jsx";

function PersonalInformation(props) {
  const { userData, userDataCopy, setUserDataCopy, isValid, updateInformation } = props;
  const [countries, setCountries] = useState([]);

  const getAllCountries = async () => {
    const url = "https://restcountries.com/v3.1/all";

    try {
      const { data } = await axios.get(url);

      const allCountries = data.map((country) => {
        return {
          name: country.name.common,
          code: country.cca2, 
          flag: country.flags.png,
          phoneCode: country.idd.root
      }});

      setCountries(allCountries);
    } catch(error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, [])
  
  if(countries.length === 0) {
    return <div></div>
  };

  return(
    <>
      <PersonalInformationContent 
        userData={userData} 
        userDataCopy={userDataCopy} 
        setUserDataCopy={setUserDataCopy}
        countries={countries}
      />

      <ContactInformation 
        userData={userData} 
        userDataCopy={userDataCopy} 
        setUserDataCopy={setUserDataCopy}
        countries={countries}
      />

      <Button 
        onClick={() => updateInformation()} 
        isValid={isValid} 
        text={"Save"}
      />
    </>
  )
};

export default PersonalInformation;