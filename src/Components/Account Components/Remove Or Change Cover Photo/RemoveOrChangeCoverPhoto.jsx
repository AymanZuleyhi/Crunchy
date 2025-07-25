import "./RemoveOrChangeCoverPhoto.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRef, useContext } from "react";
import { AppContext } from "../../../Context/AppContext";

const optoions = [
  { icon: faFileImage, text: "Change" }, 
  { icon: faTrash, text: "Remove"}
];

function RemoveOrChangeCoverPhoto(props) {
  const { handleShowUploadPicture, setIsActive, type } = props;

  const { backendUrl } = useContext(AppContext);

  const removeCoverPhoto = async () => {
    const url = `${backendUrl}/user/remove-cover-profile-photo`;

    try {
      const { data } = await axios.post(url, 
        { type },
        { withCredentials: true }
      );

      if(data.success) {
        console.log(data);
        setIsActive(false);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  const handeClick = (option) => {
    if(option.text === "Change") {
      handleShowUploadPicture("cover-photo");
      setIsActive(false);
    } else {
      removeCoverPhoto();
    };
  };

  return (
    <div className="REMOVE-CHANGE-COVER-PHOTO">
      {optoions.map((option) => {
        return (
          <div onClick={() => handeClick(option)} key={option.text}>
            <FontAwesomeIcon icon={option.icon}/>
            <p>{option.text}</p>
          </div>
        )
      })}
    </div>
  )
};

export default RemoveOrChangeCoverPhoto;