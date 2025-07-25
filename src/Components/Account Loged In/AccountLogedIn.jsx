import "./AccountLogedIn.css";
import { faPlus, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import UserProfile from "../User Profile/UserProfile.jsx";
import NavBarButton from "../Nav Bar Button/NavBarButton.jsx";

function AccountLogedIn() {
  return (
    <div className="ACCOUNT_LOGEDIN">
      <NavBarButton icon={faPlus} text={"Recipe"} />
      <NavBarButton icon={faNewspaper} text={""} />

      <UserProfile />
    </div>
  )
};

export default AccountLogedIn;