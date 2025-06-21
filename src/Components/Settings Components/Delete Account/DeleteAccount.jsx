import "./DeleteAccount.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";
import Button from "../../Button/Button";
import IconButton from "../../Icon Button/IconButton";

function DeleteAccount(props) {
  const { handleShowDeleteAccount } = props;

  const navigate = useNavigate();

  const { backendUrl, handleCheckAuth } = useContext(AppContext);

  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/auth/logout`, {}, {
        withCredentials: true,
        credentials: "include"
      });

      if(data.success) {
        return data.success;
      };
    } catch(error) {
      console.error(data.error);
    };
  };

  const handleDeleteAccount = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/user/delete`, 
        {},
        { withCredentials: true }
      );

      let loggedOut

      if(data.success) {
        loggedOut = await logout();
      };
      
      if(data.success && loggedOut) {
        navigate("/");
        handleShowDeleteAccount();
        toast(data.message);
        handleCheckAuth();
      };
    } catch(error) {
      toast.error(error.message);
    }
  };

  return(
    <div className="DELETE-ACCOUNT">
      <div className="delete-account_headline">
        <h2>Delete Account</h2>
        <IconButton onClick={handleShowDeleteAccount} icon={faClose} />
      </div>
      
      <p>Are you sure you want to delete your account?</p>
      
      <div onClick={() => handleChecked()} className="checked">
        <FontAwesomeIcon icon={ checked ? faSquareCheck : faSquare }/>
        <p>I understand that I won't be able to recover my account</p>
      </div>
      
      <Button 
        onClick={() => handleDeleteAccount()}
        type={checked ? "valid" : "invalid"} 
        text={"Delete"}
        err={true}
      />
    </div>
  )
};

export default DeleteAccount;