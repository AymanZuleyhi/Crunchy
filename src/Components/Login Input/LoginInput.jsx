import "./LoginInput.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { SecurityFlowContext } from "../../Context/SecurityFlowContext.jsx";
import ForgotPassword from "../Forgot Password/ForgotPassword.jsx";
import ShowHidePassword from "../Show Hide Password/ShowHidePassword.jsx";

function LoginInput(props) {
  const { 
    onChange, 
    text, 
    name, 
    type, 
    value, 
    placeholder, 
    error,
    forgotPassword
  } = props;

  const { setIsText, setFlowType, setEmail } = useContext(SecurityFlowContext);

  const navigate = useNavigate();

  const [inputType, setInputType] = useState(type);

  const changeInputType = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleForgotPasswort = () => {
    setIsText(true);
    setFlowType("change-password");
    setEmail(true);
    navigate("/confirm-information");
  };

  return(
    <div className="LOGIN_INPUT">
      <div>
        <p>{text}</p>
        {type === "password" &&
          <ShowHidePassword inputType={inputType} changeInputType={changeInputType}/>
        }
      </div>
      
      <input 
        onChange={onChange}
        name={name}
        type={inputType}
        value={value}
        placeholder={placeholder}
      />

      {forgotPassword &&
        <ForgotPassword onClick={handleForgotPasswort}/>
      }
    </div>
  )
};

export default LoginInput;
