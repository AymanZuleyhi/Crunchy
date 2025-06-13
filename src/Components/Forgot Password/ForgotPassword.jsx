import "./ForgotPassword.css";

function ForgotPassword(props) {
  const { onClick } = props;

  return (
    <p 
      onClick={onClick} 
      className="FORGOT-PASSWORD">
        Forgot your password?
    </p>
  )
};

export default ForgotPassword;