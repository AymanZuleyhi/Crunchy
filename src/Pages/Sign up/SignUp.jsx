import "./SignUp.css";
import { useLocation } from "react-router-dom";
import assets from "../../assets/assets.js";
import Form from "../../Components/Form/Form.jsx";
import VerifyOTP from "../Verify OTP/VerifyOTP.jsx";

function SignUp() {
  const location = useLocation().pathname;

  return(
    <div className="SIGN_UP_PAGE">
      {location === "/verify" &&
        <VerifyOTP 
          h1={"Verify your account"}
          p={"Please enter the OTP below to verify your account"}
        />
      }

      {location === "/change-password" &&
        <VerifyOTP 
          h1={"Change your password"}
          p={"Please enter the OTP below to change your password"}
        />
      }

      {location === "/sign-up" &&
        <Form />
      }      

      {location !== "/verify" && location !== "/change-password" &&
        <img className="sign-up_img" src={assets.signup}/>

      }
    </div>
  )
};

export default SignUp;