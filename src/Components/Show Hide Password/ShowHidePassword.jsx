import "./ShowHidePassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

function ShowHidePassword(props) {
  const { inputType, changeInputType } = props;

  return (
    <div 
      onClick={() => changeInputType()} 
      className="SHOW-HIDE-PASSWORD">
        <p>{inputType === "password" ? "Hide" : "Show"}</p>
        <FontAwesomeIcon icon={inputType === "password" ? faEyeSlash : faEye} />
    </div>
  )
};

export default ShowHidePassword;