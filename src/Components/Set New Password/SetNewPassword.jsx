import "./SetNewPassword.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { SecurityFlowContext } from "../../Context/SecurityFlowContext.jsx";
import Button from "../Button/Button.jsx";
import FormInput from "../Form Input/FormInput.jsx";

function SetNewPassword() {
  const { backendUrl } = useContext(AppContext);
  const { email } = useContext(SecurityFlowContext);
  
  const formRef = useRef(null);

  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);

  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const inputs = [
    {
      text: "New password",
      name: "newPassword",
      type: "password",
      value: values.newPassword,
      placeholder: "New password",
      error: "The password needs to be 8-16 characters long, contain 1 lower case letter, 1 upper case letter, and 1 special symbol.",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$",
      required: true
    },
    {
      text: "Confirm password",
      name: "confirmPassword",
      type: "password",
      value: values.confirmPassword,
      placeholder: "Confirm new password",
      error: "Passwords don't match.",
      pattern: values.newPassword,
      required: true
    },
  ];

  const onChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name] : e.target.value
    }));
  };

  const handleSetNewPassword = async (e) => {
    e.preventDefault();

    const url = `${backendUrl}/auth/set-new-password`;

    try {
      const { data } = await axios.post(url, 
        { 
          email: email,
          newPassword: values.newPassword, 
        }
      );

      console.log(data);
      if(data.success) {
        toast(data.message);
        navigate("/");
      };
    } catch(error) {
      console.error("There was an issue while trying to send the new password to the back-end.");
    }
  };

  useEffect(() => {
    setIsValid(formRef.current.checkValidity());
  }, [values])

  return (
    <div className="SET-NEW-PASSWORD">
      <h1>Set a new password</h1>
      <p>Please enter your new password, and then confirm it.</p>

      <form onSubmit={handleSetNewPassword} ref={formRef}>
        {
          inputs.map((value) => {
            return ( 
              <FormInput
                key={value.name} 
                text={value.text}
                name={value.name}
                type={value.type}
                value={value.value}
                placeholder={value.placeholder}
                error={value.error}
                pattern={value.pattern}
                required={value.required}
                onChange={onChange}
              />
            )
          })
        }

        <Button isValid={isValid} text={"Set new password"}/>
      </form>
    </div>
  )
};

export default SetNewPassword;