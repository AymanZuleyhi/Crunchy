import "./AccountCoverPhoto.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCamera } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../Context/AppContext";
import { useState, useContext } from "react";
import Button from "../../Button/Button";
import RemoveOrChangeCoverPhoto from "../Remove Or Change Cover Photo/RemoveOrChangeCoverPhoto.jsx";

function AccountCoverPhoto(props) {
  const { user, handleShowUploadPicture } = props;

  const { userData } = useContext(AppContext);

  const [isActive, setIsActive] = useState(false);

  const handleIsActive = () => {
    if(user.pictures.cover === "") {
      handleShowUploadPicture("cover-photo");
    } else {
       setIsActive(!isActive);
    };
  };

  return (
    <div className="cover-image_container">
      {user.pictures.cover !== "" &&
        <img src={user.pictures.cover}/>
      }
      
      {user.pictures.cover === "" &&
        <>
          <img className="cover-image" />
          <FontAwesomeIcon className="utensils" icon={faUtensils}/>
        </> 
      }
      
      <div className="cover-photo_controls">
        {user._id === userData._id &&
          <Button 
            onClick={handleIsActive} 
            text={user.pictures.cover === "" ? "Add Cover Photo" : "Change Cover Photo"} 
            icon={faCamera} 
          />
        }

        {isActive &&
          <RemoveOrChangeCoverPhoto 
            handleShowUploadPicture={handleShowUploadPicture}
            setIsActive={setIsActive}  
            type={"cover"}
          />
        }
      </div>
    </div>
  )
};

export default AccountCoverPhoto;