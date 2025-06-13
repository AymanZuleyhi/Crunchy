import TwoFactorAuthentication from "../Two Factor Authentication/TwoFactorAuthentication..";
import ChangePassword from "./Change Password/ChangePassword";
import SecurityQuestions from "./Security Questions/SecurityQuestions";
import "./Security.css";

function Security() {

  return(
    <>
      <ChangePassword />
      <TwoFactorAuthentication />
      <SecurityQuestions />
    </>
  )
};

export default Security;