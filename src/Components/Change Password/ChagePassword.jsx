import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "../Button/Button";
import LoginInput from "../Login Input/LoginInput.jsx";

function ChangePassword() {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [values, setValues ]= useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  
  const passwordInputs = [
    {
      text: "Old password",
      name: "oldPassword",
      type: "password",
      value: values.oldPassword,
      placeholder: "Old password",
      error: "",
    },
    {
      text: "New password",
      name: "newPassword",
      type: "password",
      value: values.newPassword,
      placeholder: "New password",
      error: "",
    },
    {
      text: "Confirm new password",
      name: "confirmNewPassword",
      type: "password",
      value: values.password,
      placeholder: "Enter new password",
      error: "",
    }
  ];

  const onChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const {data } = await axios.post(`${backendUrl}/auth/reset-password`, 
        { oldPassword: values.oldPassword, newPassword: values.newPassword },
        { withCredentials: true }
      );

      if(data.success) {
        navigate("/");
        toast(data.message);
      } else {
        toast.error(data.message);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  return (
    <div className="CHANGE-PASSWORD">
      <h2>Change your password</h2>
      <p>Please enter your old password, followed by your new password.</p>
      
      <form onSubmit={handleChangePassword}>
        {
          passwordInputs.map((value) => {
            return (
              <LoginInput
                key={value.placeholder}
                text={value.text}
                name={value.name}
                type={value.type}
                value={value.value}
                placeholder={value.placeholder}
                error={value.error}
                onChange={onChange}
              />
            ) 
          })
        }

        <Button text={"Change password"}/>
      </form>
    </div>
  )
};

export default ChangePassword;