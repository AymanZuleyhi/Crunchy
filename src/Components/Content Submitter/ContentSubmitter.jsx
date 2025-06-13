import "./ContentSubmitter.css";
import axios from "axios";
import { toast } from "react-toastify";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import Button2 from "../Button 2/Button2";
import Button from "../Button/Button";
import Textarea from "../Textarea/Textarea";
import SubmitRating from "../Recipe Components/Submit Rating/SubmitRating";
import UploadImages from "../Add Recipe Components/Upload Images/UploadImages";
import AttachPhotos from "../News Feed Components/Attach Photos/AttachPhotos";

function ContentSubmitter(props) {
  const { type, handleIsActive, fetchContent } = props;

  const userId = useLocation().pathname.split("/")[2];

  const { backendUrl } = useContext(AppContext);

  const [showAttachPhotos, setShowAttachPhotos] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [rating, setRating] = useState();

  const handeleShowAttachPhotos = () => {
    setShowAttachPhotos(!showAttachPhotos);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Functions for uploading images.
  const removeAllPhotos = (setImages) => {
    setPhotos([]);
    setImages([]);
  };

  const removeImage = (image, setImages) => {
    setPhotos((prevPhotos) => {
      return prevPhotos.filter((photo) => photo.name !== image.name )
    });

    setImages((prevImages) => {
      return prevImages.filter((photo) => photo.rawFile.name !== image.name)
    });
  };

  const handleSubmitContent = async () => {
    const url = type === "post"
    ? `${backendUrl}/news-feed/new-post`
    : `${backendUrl}/recipe/add-comment/${userId}`

    try {
      const { data } = await axios.post(url, 
        { text: userInput, type, rating, photos: photos.map((photo) => photo.url) },
        { withCredentials: true }
      );

      if(data.success) {
        toast(data.message);
        handleIsActive();
        fetchContent();
      } else {
        toast.error(data.message);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  return (
    <div className="CONTENT-SUBMITTER">
      <div className="content-submitter_headline">
        <h2>{`Submit your ${type}`}</h2>
        <Button2 text={"Close"} icon={faX} onClick={handleIsActive}/>
      </div>

      {type === "review" &&
        <SubmitRating
          rating={rating} 
          setRating={setRating} 
        />
      }

      <Textarea userInput={userInput} onChange={handleUserInput}/>

      {type === "post" &&
        <AttachPhotos
          showAttachPhotos={showAttachPhotos}
          handeleShowAttachPhotos={handeleShowAttachPhotos}
        />
      }

      {type === "post" && showAttachPhotos &&
        <UploadImages 
          photos={photos} 
          setPhotos={setPhotos}
          removeAllPhotos={removeAllPhotos}
          removeImage={removeImage}
        />
      }

      <Button
        onClick={handleSubmitContent} 
        text={"Submit"}
        isValid={userInput.trim().length !== 0}
      />
    </div>
  )
};

export default ContentSubmitter;