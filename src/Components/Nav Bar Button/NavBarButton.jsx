import "./NavBarButton.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Helpers } from "../../Context/Helpers";
import { SecurityFlowContext } from "../../Context/SecurityFlowContext";
import { AppContext } from "../../Context/AppContext";

function NavBarButton(props) {
  const { icon, text } = props;

  const navigate = useNavigate();

  const { userData } = useContext(AppContext);
  const { screenWidth } = useContext(Helpers);
  const { setEmail, setFlowType } = useContext(SecurityFlowContext);

  const handleNavigation = () => {
    if(userData?.isVerified) {
      navigate(text === "Recipe" ? "/add-recipe" : "/news-feed");
    } else {
      setFlowType("confirm-account");
      navigate("/verify");
      window.scrollTo(0, 0);
      setEmail(userData?.email);
    };
  };

  return (
    <button onClick={handleNavigation} className={`NAV-BAR-BUTTON ${text === "" || screenWidth < 500 ? "news-feed" : "add-recipe"}`}>
      <FontAwesomeIcon icon={icon}/>
      {text !== "" && screenWidth > 500 &&
        <p>{text}</p>
      }
    </button>
  )
};

export default NavBarButton;