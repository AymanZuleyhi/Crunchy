import "./TwoFactorAuthentication.css";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SecurityFlowContext } from "../../../Context/SecurityFlowContext.jsx";
import { AppContext } from "../../../Context/AppContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TwoFactorAuthentication() {
  const { userData } = useContext(AppContext);
  const { setFlowType, setIsText, setEmail } = useContext(SecurityFlowContext);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsText(false);
    setFlowType("2fa");
    setEmail(userData?.email);
    navigate("/confirm-information");
  };

  return (
    <div className="container">
      <div className="two-fa_container">
        <h2>Two-Factor Authentication</h2>
        <FontAwesomeIcon icon={faEnvelope}/>
      </div>
      

      <div className="two-factor-authentication_container">
        <p>Two-Factor Authentication (2FA) helps protect your account even if your password is compromised.</p>
        <p onClick={handleClick}>
          {`${userData?.twoFactorAuthentication ? "Disable" : "Enable"} 2 FA`}
        </p>
      </div>
    </div>
  )
};

export default TwoFactorAuthentication;