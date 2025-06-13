import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SecurityFlowContext } from "../../../../Context/SecurityFlowContext.jsx";

function ChangePassword() {
  const { setIsText, setFlowType } = useContext(SecurityFlowContext);

  const navigate = useNavigate();
  
  const handleClick = () => {
    setIsText(true);
    setFlowType("change-password");
    navigate("/confirm-information")
  };

  return (
    <div className="container">
      <h2>Change your password 🔒</h2>

      <div className="security_container">
        <p>Ready to update your password? Just click the button below!</p>
        <p onClick={handleClick}>Change password</p>
      </div>
    </div>
  )
};

export default ChangePassword;