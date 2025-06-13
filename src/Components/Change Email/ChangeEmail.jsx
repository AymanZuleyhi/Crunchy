import "./ChangeEmail.css";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import Button from "../../Components/Button/Button.jsx";
import Input from "../../Components/Input/Input.jsx";

function ChangeEmail(props) {
  const { handleEmailInput, sendOtp } = props;
  const inputRef = useRef(null);

  const [input, setInput] = useState();
  const [isValid, setIsValid] = useState(false);

  const changeEmail = (e) => {
    e.preventDefault();
    handleEmailInput();
    toast("An OTP has been send to your email.");
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const resendOtp = async () => {
    sendOtp(input);
    handleEmailInput();
  };

  useEffect(() => {
    setIsValid(inputRef?.current?.checkValidity());
  }, [input])

  return (
    <form onSubmit={changeEmail} className="CHANGE-EMAIL">
      <Input 
        value={input} 
        onChange={handleInput} 
        type={"email"} 
        placeholder={"Your email"}
        ref={inputRef}
        required
      />
      
      <Button 
        text={"Resend OTP"}
        onClick={resendOtp}
        isValid={isValid}
      />

      <p onClick={handleEmailInput}>Cancel</p>
    </form>
  )
};

export default ChangeEmail;