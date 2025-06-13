import "./ConfirmEmail.css";
import { useState, useRef, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ConfirmEmail() {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const inputRef = useRef(null);
  const [userInput, setUserInput] = useState();

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const confirmEmail = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/auth/check-email`, 
        { email: userInput },
      );

      if(data.success) {
        navigate(`/verify?action=forgotten-password`, { state: { email: userInput } });
      };
    } catch(error) {
      console.error(error.message)
    }
  };

  return (
    <form  onSubmit={confirmEmail} className="CONFIRM-PASSWORD">
      <h1>Verify that it's you</h1>
      <p>Hey there! 👋
Before we can help you reset your password, we just need to make sure it's really you.
Enter the email linked to your account, and we'll send you a quick security check to get you back in safely!</p>
      <p>Please enter your email bellow.</p>
      
      <Input 
        ref={inputRef}
        value={userInput} 
        placeholder={"Your email"} 
        type={"email"}
        onChange={handleUserInput}
      />
      
      <Button 
        // isValid={inputRef?.current?.checkValidity()}
        text={"Next"}
      />
    </form>
  )
};

export default ConfirmEmail;