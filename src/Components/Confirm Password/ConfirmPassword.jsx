import "./ConfirmPassword.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate,  } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { SecurityFlowContext } from "../../Context/SecurityFlowContext.jsx";
import Button from "../Button/Button";
import LoginInput from "../Login Input/LoginInput.jsx";

function ConfirmPassword() {
  const { backendUrl, userData } = useContext(AppContext);
  const { isText, flowType, email, setEmail } = useContext(SecurityFlowContext);
  console.log(isText);
  const [userInput, setUserInput] = useState("");

  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleCheckInformation = async (e) => {
    e.preventDefault();

    const url = `${backendUrl}/auth/check-information`;

    try {
      const { data } = await axios.post(url, 
        { email, flowType, userInput },
      );

      if(data.success) {
        setEmail(data.email);
        navigate("/verify");
      } else {
        setUserInput("");
        toast.error(data.message);
      };
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleCheckInformation} className="CONFIRM-PASSWORD">
      <h1>Verify that it's you</h1>
      <p>{`Hey, ${userData?.name}! 👋 Before we can change any information on your account, we need to make sure it's actually you.`}</p>
      
      <p>{`Please enter your ${isText ? "email" : "password"} bellow.`}</p>

      <LoginInput 
        text={`Your ${isText ? "Email" : "Password"}`}
        onChange={handleUserInput} 
        value={userInput} 
        placeholder={`${isText ? "Email" : "Password"}`} 
        type={isText ? "text" : "password"}
        forgotPassword={!isText}
      />

      <Button 
        isValid={userInput.trim().length !== 0 } 
        text={"Next"}/>
    </form>
  )
};

export default ConfirmPassword;