import "./AccountProfilePicture.css";
import assets from "../../../assets/assets";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "../../Button/Button";
import RemoveOrChangeCoverPhoto from "../Remove Or Change Cover Photo/RemoveOrChangeCoverPhoto";

function AccountProfilePicture(props) {
  const { userData, user, handleShowUploadPicture } = props;

  const location = useLocation().pathname.split("/")[2];

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if(userData.pictures.profile === "") {
      handleShowUploadPicture("profile-picture");
    } else {
      setIsActive(!isActive);
    };
  };

  return (
    <div className="ACCOUNT-PROFILE-PICTURE">
      <img src={user.pictures.profile ? user.pictures.profile : assets.blankProfilePicture}/>
      
      {location === userData._id &&
        <Button 
          onClick={handleClick} 
          icon={faCamera} 
        />
      }

      {isActive &&
        <RemoveOrChangeCoverPhoto 
          handleShowUploadPicture={handleShowUploadPicture}
          setIsActive={setIsActive}  
          type={"profile"}
        />
      }
    </div>
  )
};

export default AccountProfilePicture;