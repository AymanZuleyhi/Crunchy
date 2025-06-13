import "./Form.css";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import FormInput from "../Form Input/FormInput";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/AppContext.jsx";

function Form() {
  const { backendUrl, setLogedIn, getUserData } = useContext(AppContext);
  const [isButtonValid, setIsButtonValid] = useState();
  const formRef = useRef(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputValues = [
    {
      text: "Name",
      name: "name",
      type: "text",
      value: values.name,
      placeholder: "Enter your name",
      error: "Your name is not valid",
      pattern: "^[a-zA-Z]{3,16}$",
      required: true
    },
    {
      text: "Email",
      name: "email",
      type: "email",
      value: values.email,
      placeholder: "example@gmail.com",
      error: "Email is required",
      pattern: "^[A-Za-z0-9\\.\\-_+]+@[A-Za-z0-9\\.\\-_+]+\\.[A-Za-z]{2,}$",
      required: true
    },
    {
      text: "Password",
      name: "password",
      type: "password",
      value: values.password,
      placeholder: "Enter your password",
      error: "The password needs to be 8-16 characters long, contain 1 lower case letter, 1 upper case letter, and 1 special symbol.",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$",
      required: true
    },
    {
      text: "Confirm password",
      name: "confirmPassword",
      type: "password",
      value: values.confirmPassword,
      placeholder: "Confirm your password",
      error: "Passwords don't match.",
      pattern: values.password,
      required: true
    }
  ];

  const onChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name] : e.target.value
    }));
  };

  useEffect(() => {
    setIsButtonValid(formRef?.current?.checkValidity());
  }, [values]);
  
  const sendInfoToDb = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`${backendUrl}/auth/register`, values, {
      withCredentials: true
    });

    if(data.success) {
      getUserData();
      navigate("/");
      setLogedIn(true);
      toast(data.message);
    } else {
      toast.error(data.message);
    };
  };

  return(
    <form onSubmit={sendInfoToDb} ref={formRef} className="SIGN-UP">
      <h1>Create an account </h1>

      {
        inputValues.map((values) => {
          return (
            <FormInput 
              key={values.name} 
              text={values.text}
              name={values.name}
              type={values.type}
              value={values.value}
              placeholder={values.placeholder}
              error={values.error}
              pattern={values.pattern}
              required={values.required}
              onChange={onChange}
            />
          )
        })
      }
      
      <Button text={"Create account"} isValid={isButtonValid} />
      
      <Link to={"/login"}>
        <p className="have-account">Already have an account? <span>Login</span></p>
      </Link>
    </form>
  )
};

export default Form;