import "./FollowingUser.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";
import assets from "../../../assets/assets";

function FollowingUser(props) {
  const { pictures, name, _id } = props.user;
  const { setMenu } = props;

  const { handleCheckAuth, userData } = useContext(AppContext);

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/account/${_id}`);
    handleCheckAuth();

    // Change the active tab in the menu to be "Recipes".
    setMenu((prevMenu) => {
      return prevMenu.map((menu) => {
        return menu.name === "Recipes"
        ? { ...menu, active: true }
        : { ...menu, active: false }
      })
    });
  };

  return (
    <div onClick={handleNavigation} className="FOLLOWING-USER">
      <img src={ pictures.profile ? pictures.profile : assets.blankProfilePicture }/>
      <p>{`${name} ${userData?._id === _id ? "(You)" : ""}`}</p>
    </div>
  )
};

export default FollowingUser;