import "./AccountLogedIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import UserProfile from "../User Profile/UserProfile.jsx";
import { SecurityFlowContext } from "../../Context/SecurityFlowContext.jsx";

function AccountLogedIn() {
  const { userData } = useContext(AppContext);
  const { setEmail, setFlowType } = useContext(SecurityFlowContext);

  const navigate = useNavigate();

  const handleNavigation = (location) => {
    if(userData?.isVerified) {
      navigate(location);
    } else {
      setFlowType("confirm-account");
      navigate("/verify");
      window.scrollTo(0, 0);
      setEmail(userData?.email);
    };
  };

  return (
    <div className="ACCOUNT_LOGEDIN">
      <div onClick={() => handleNavigation("/add-recipe")} className="add-recipe-button">
        <FontAwesomeIcon icon={faPlus} />
        <p>Recipe</p>
      </div>

      <button onClick={() => handleNavigation("/news-feed")} className="news-feed-button">
        <FontAwesomeIcon icon={faNewspaper} />
      </button>

      <UserProfile />
    </div>
  )
};

export default AccountLogedIn;