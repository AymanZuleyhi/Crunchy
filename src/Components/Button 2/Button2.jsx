import "./Button2.css";
import HoverBox from "../Hover Box/HoverBox.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button2(props) {
  const { icon, text, onClick, type, isValid } = props;
  
  return (
    <button onClick={onClick} type={type} className={`BUTTON2 ${isValid || isValid === undefined ? "valid" : "not-valid"}`}>
      <FontAwesomeIcon icon={icon}/>
      <HoverBox text={text}/>
    </button>
  )
};

export default Button2;