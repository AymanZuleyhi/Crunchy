import Button from "../Button/Button";
import axios from "axios";
import Input from "../Input/Input";
import "./TwoFactorAuthentication.css";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

function TwoFactorAuthentication() {
  const { backendUrl } = useContext(AppContext);

  const checkPassword = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/auth/`)
    } catch(error) {
      console.error(error.message);
    }
  };

  return (
    <div className="TWO-FACTOR-AUTHENTICATION">
      <form onSubmit={checkPassword}>
        <h2>Secure Your Account with Two-Factor Authentication</h2>
        <p>Adding an extra layer of protection to your account is easy. Once enabled, you’ll be asked to enter a one-time code sent to your email each time you log in.</p>
        
        
        <Button text={"Enable 2FA"} />
      </form>
    </div>
  )
};

export default TwoFactorAuthentication;