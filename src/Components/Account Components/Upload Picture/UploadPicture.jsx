import "./UploadPicture.css";
import axios from "axios";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";
import { Helpers } from "../../../Context/Helpers.jsx";
import Button2 from "../../Button 2/Button2";
import Button from "../../Button/Button.jsx";
import UploadImages from "../../Add Recipe Components/Upload Images/UploadImages.jsx"
import { toast } from "react-toastify";

function UploadPicture(props) {
  const { handleShowUploadPicture, type } = props;

  const { backendUrl, handleCheckAuth } = useContext(AppContext);
  const { setShowSpinner } = useContext(Helpers);

  const [photos, setPhotos] = useState([]);
    
  const handleUploadPicture = async () => {
    const url = `${backendUrl}/user/update-picture/${type}`

    const startTime = Date.now();
    setShowSpinner(true);

    try {
      const { data } = await axios.post(url, 
        { photo: photos[0] },
        { withCredentials: true }
      );

      if(data.success) {
        handleCheckAuth();
        toast(data.message);
        handleShowUploadPicture();
      };
    } catch(error) {
      console.error(error.message);
    } finally {
      const duration = Date.now() - startTime;
      const remaining = 1500 - duration;

      setTimeout(() => {
        setShowSpinner(false);
      }, remaining > 0 ? remaining : 0)
    }
  };

  const removeImage = (image, setImages) => {
    setPhotos([]);

    setImages([]);
  };

  return (
    <div className="UPLOAD-PICTURE">
      <div className="upload-picture_headline">
        <h2>Upload your picture</h2>
        <Button2 onClick={handleShowUploadPicture} text={"Close"} icon={faX}/>
      </div>

      <UploadImages 
        photos={photos} 
        setPhotos={setPhotos} 
        multiple={false}
        removeImage={removeImage}
      />

      <Button 
        onClick={handleUploadPicture} 
        text={"Upload"}
        isValid={photos.length !== 0}
      />
    </div>
  )
};

export default UploadPicture;