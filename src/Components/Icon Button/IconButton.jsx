import "./IconButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IconButton(props) {
  const { icon, onClick } = props;

  return(
    <button onClick={onClick} className="ICON-BUTTON">
      <FontAwesomeIcon icon={icon}/>
    </button>
  )
};

export default IconButton;