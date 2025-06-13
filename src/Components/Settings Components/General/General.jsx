import "./General.css";
import AboutMe from "../About Me/AboutMe.jsx";
import SocialAccounts from "../Social Accounts/SocialAccounts.jsx";
import Button from "../../Button/Button.jsx";

function General(props) {
  const { userData, userDataCopy, setUserDataCopy, isValid, updateInformation } = props;

  if(!userData) {
    return <div></div>
  };

  return (
    <>
      <AboutMe 
        userDataCopy={userDataCopy} 
        setUserDataCopy={setUserDataCopy}
      />

      <SocialAccounts 
        userDataCopy={userDataCopy} 
        setUserDataCopy={setUserDataCopy}
      />

      <Button 
        onClick={() => updateInformation()} 
        isValid={isValid} 
        text={"Save"}
      />
    </>
  )
};

export default General;