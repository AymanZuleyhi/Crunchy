import "./LoginForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx"; 
import { SecurityFlowContext } from "../../Context/SecurityFlowContext.jsx";
import LoginInput from "../Login Input/LoginInput";
import Button from "../../Components/Button/Button.jsx";


function LoginForm() {
  const { backendUrl, setLogedIn, getUserData } = useContext(AppContext);

  const { setEmail, setFlowType } = useContext(SecurityFlowContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState();

  const inputValues = [
    {
      text: "Email",
      name: "email",
      type: "email",
      value: values.email,
      placeholder: "example@gmail.com",
      error: "Email does not exist.",
    },
    {
      text: "Password",
      name: "password",
      type: "password",
      value: values.password,
      placeholder: "Enter your password",
      error: "Password doesn't match.",
      forgotPassword: true
    }
  ];

  const navigate = useNavigate();

  const onChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    setIsValid(values.email.trim().length !== 0 && values.password.trim().length !== 0 ? true : false)
  }, [values])

  const sendInfoToDb = async (e) => {
    e.preventDefault();

    const url = `${backendUrl}/auth/login`;

    const { data } = await axios.post(url, values, {
      withCredentials: true
    });

    console.log(data);
    if(!data.success) {
      setValues({
        email: values.email,
        password: "" 
      });

      toast.error(data.message);
      return;
    };

    if(data.twoFactorAuthentication) {
      setEmail(data.email);
      setFlowType("login-2fa");
      navigate("/verify");
      return;
    };

    if(!data.twoFactorAuthentication) {
      getUserData();
      navigate("/");
      // setLogedIn(true);
      toast(data.message);
    };
  };

  return (
    <form onSubmit={sendInfoToDb} className="LOGIN">
      <h1>Login</h1>

      {
        inputValues.map((values) => {
          return (
            <LoginInput 
              key={values.name} 
              text={values.text}
              name={values.name}
              type={values.type}
              value={values.value}
              placeholder={values.placeholder}
              error={values.error}
              forgotPassword={values.forgotPassword}
              onChange={onChange}
            />
          )
        })
      }

      <Button text="Login" type={isValid ? "valid" : "invalid"} />

      <Link to={"/sign-up"}>
        <p className="sign-up">Don't have an account? <span>Sign up</span></p>
      </Link>
    </form>
  )
};

export default LoginForm;