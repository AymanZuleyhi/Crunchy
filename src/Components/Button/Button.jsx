import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

function Button(props) {
  const { type, text, icon, onClick, style } = props;

  return (
    <button className={`BUTTON ${type}`} type={type} style={style} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon}/>}
      {text && <p>{text}</p>}
    </button>
  )
};

export default Button;