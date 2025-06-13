import "./Login.css";
import assets from "../../assets/assets";
import LoginForm from "../../Components/Login Form/LoginForm.jsx";

function Login() {
  return (
    <div className="LOGIN_PAGE">
      <LoginForm />
      <img className="login_img" src={assets.login}/>
    </div>
  )
};

export default Login;