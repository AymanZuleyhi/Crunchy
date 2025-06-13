import "./VerifyOTP.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { SecurityFlowContext } from "../../Context/SecurityFlowContext.jsx";
import Button from "../../Components/Button/Button.jsx";

const array = [1, 2, 3, 4, 5, 6];

function VerifyOTP() {
  const { backendUrl, userData, handleCheckAuth } = useContext(AppContext);
  const { email, flowType } = useContext(SecurityFlowContext);

  const navigate = useNavigate();

  const inputRef = useRef(null);

  const [isValid, setIsValid] = useState(null);
  const [resendTimer, setResendTimer] = useState(5);
  const [emailInput, setEmailinput] = useState(false);

  setTimeout(() => {
    if(resendTimer > 0) {
      setResendTimer(resendTimer - 1);
    };
  }, 1000);

  const checkValidity = () => {
    const inputs = Array.from(inputRef.current.children);
    const isValid = inputs.filter((input) => {
      return input.value.length !== 0
    });

    setIsValid(isValid.length === 6 ? true : false);
  };
  
  const handlePaste = (e, index) => {
    const pastedContent = e.clipboardData.getData("text");
    const container = Array.from(inputRef.current.children);

    let i = 0;
    let contentIndex = 0;
    for(const input of container) {
      if(i < index) {
        i += 1;
      } else {
        input.value = pastedContent[contentIndex];
        contentIndex += 1;
      };

      checkValidity();
    };  

    // Focus input.
    const value = pastedContent.length + index;
    if(value > container.length -1) {
      container[container.length -1].focus();
    };
  };

  const onInput = (e, i) => {
    const container = inputRef.current.children;

    if(e.target.value.length > 1) {
      container[i + 1].value = e.target.value[1];
      container[i].value = e.target.value[0];
      container[i + 1].focus();
      
      return;
    };
    
    // Focus the next input.
    if(e.target.value && (i < container.length - 1)) {
      container[i + 1].focus();
    };
  };

  const onKeyUp = (e, i) => {
    const container = inputRef.current.children;

    if(e.key === "Backspace" && i !== 0) {
      container[i - 1].focus();
    };
  };

  const handleCheckOTP = async (e) => {
    e.preventDefault();

    const otp = Array.from(inputRef.current.children).map((input) => input.value).join("");

    const url = `${backendUrl}/auth/check-${flowType}-otp`;

    try {
      const { data } = await axios.post(url, 
        { email, flowType, otp }, 
      );

      if(!data.success) {
        toast.error(data.error);
      };

      if(flowType === "confirm-account") {
        handleCheckAuth();
        toast(data.message);
        navigate("/");
        return;
      };

      if(flowType === "change-password") {
        toast(data.message);
        navigate(userData?.isSecurityQuestions ? "/check-security-questions" : "/set-new-password");
      };

      if(flowType === "2fa") {
        toast(data.message);
        navigate("/")
      };

      if(flowType === "login-2fa") {
        handleCheckAuth();
        toast(data.message);
        navigate("/");
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  const sendOtp = async () => {
    const url = `${backendUrl}/auth/send-otp/${flowType}`;

    try {
      const { data } = await axios.post(url, 
        { email }
      );

      if(!data.success) {
        toast.error(data.message);
        return;
      } else {
        toast(data.message);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  const resendOtp = async () => {
    sendOtp();
    toast("A new OTP has been send to your email.");
    setResendTimer(5);
  };

  useEffect(() => {
    sendOtp();
  }, [])

  return (
    <div className="VERIFY-OTP">
      <h1>{flowType === "confirm-account" ? "Verify your account." : "Verify that it's you"}</h1>
      <p>We've sent a one-time password (OTP) to your email. Please enter it below to proceed.</p>

       {!emailInput &&
        <form onSubmit={handleCheckOTP} className="verify-otp-form">
          <div ref={inputRef}>
            {
              array.map((_,i) => {
                return ( 
                <input 
                  onInput={(e) => onInput(e, i)}
                  onKeyUp={(e) => onKeyUp(e, i)}
                  onPaste={(e) => handlePaste(e, i)}
                  onChange={checkValidity}
                  key={i} 
                  maxLength={i === array.length - 1 ? "1" : "2"} 
                  required
                />
                )
              })
            }
          </div>

         <Button
            isValid={isValid} 
            text={flowType === "2fa"
              ? userData?.twoFactorAuthentication ? "Disable 2FA" : "Activate 2FA"
              : "Verify OTP"
            } 
          />
      </form>
      }

      <div className="otp-controls">
        {!emailInput &&
        <p onClick={resendOtp}>{resendTimer === 0 ? "Resend One Time Password" :`You can request a new code in ${resendTimer} seconds`}</p>
        }
      
        {/* {!emailInput && location === "/verify" &&
          <p onClick={handleEmailInput}>Incorrect email address?</p>
        } */}
      </div>

      {/* {emailInput && 
      <ChangeEmail 
        handleEmailInput={handleEmailInput}
        sendOtp={sendOtp}
      />
      } */}
    </div>
  )
};


export default VerifyOTP; 