import "./UserBox.css";
import axios from "axios";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";
import Button from "../../Button/Button";
import assets from "../../../assets/assets.js";

function UserBox(props) {
  const { userId, name, picture } = props.user;

  const { backendUrl, handleCheckAuth } = useContext(AppContext);

  const followUser = async () => {
    const url = `${backendUrl}/user/follow-user/${userId}`;

    try {
      const { data } = await axios.post(url, 
        {},
        { withCredentials: true }
      );

      if(data.success) {
        handleCheckAuth();
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  return (
    <div className="USER-BOX">
      {picture === "" &&
        <img src={assets.blankProfilePicture}/>
      }

      {picture !== "" && 
        <img src={picture}/>
      }
      <p>{name}</p>
      <Button onClick={followUser} text={"Follow"} icon={faUserPlus}/>
    </div>
  )
};

export default UserBox;