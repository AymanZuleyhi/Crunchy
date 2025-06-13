import "./ContactInformation.css";
import Input from "../../Input/Input.jsx";
import PhoneSelector from "../Phone Selector/PhoneSelector.jsx";

function ContactInformation(props) {
  const {  userDataCopy, setUserDataCopy, countries } = props;

  const handleEmailChange = (e) => {
    setUserDataCopy((prevUserData) => ({
      ...prevUserData,
      email: e.target.value
    }));
  };

  return (
    <div className="container">
      <h2>Contact information 📞</h2>
      
      <div className="contact-information_container">
        <Input 
          onChange={handleEmailChange} 
          value={userDataCopy.email} 
          placeholder={"Email"} 
          type={"email"}
        />

        <PhoneSelector 
          selectedPhoneNumber={userDataCopy.phone}
          countries={countries} 
          userDataCopy={userDataCopy}
          setUserDataCopy={setUserDataCopy}
        />
      </div>
    </div>
  )
};

export default ContactInformation;