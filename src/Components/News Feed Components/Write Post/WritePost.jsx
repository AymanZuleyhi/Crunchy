import "./WritePost.css";
import axios from "axios";
import { toast } from "react-toastify";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext  } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";
import Button from "../../Button/Button.jsx";
import Textarea from "../../Textarea/Textarea.jsx";
import Button2 from "../../Button 2/Button2.jsx";
import AttachImages from "../Attach Photos/AttachPhotos.jsx";
import UploadImages from "../../Add Recipe Components/Upload Images/UploadImages.jsx";

function WritePost(props) {
  const { handleShowWritePost, getAllPosts } = props;
  const { backendUrl, userData } = useContext(AppContext);

  const [userInput, setUserInput] = useState("");
  const [photos, setPhotos] = useState([]);
  const [showAttachPicture, setShowAttachPicture] = useState(false);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };
  const handleShowAttachPicture = () => {
    setShowAttachPicture(!showAttachPicture);
  };

  const submitPost = async (e) => {
    e.preventDefault();

    const url = `${backendUrl}/news-feed/new-post`;

    try {
      const { data } = await axios.post(url, 
        { text: userInput, photos: photos.map((photo) => photo.url) },
        { withCredentials: true }
      );

      if(data.success) {
        toast(data.message);
        handleShowWritePost();
        getAllPosts();
      } else {
        toast.error(data.message);
      };
    } catch(error) {
      console.error(error.message);
    }
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

  return (
    <form onSubmit={submitPost} className="WRITE-POST">
      <div className="write-post_headline">
        <h2>{`What's on your mind, ${userData?.name} ?`}</h2>
              
        <Button2 onClick={handleShowWritePost} icon={faX} text={"Close"}/>        
      </div>

      <div className="write-post_body">
        <Textarea input={userInput} onChange={handleUserInput}/>

        {!showAttachPicture &&
          <AttachImages handleShowAttachPicture={handleShowAttachPicture}/>
        }

        {showAttachPicture &&
          <UploadImages 
            photos={photos} 
            setPhotos={setPhotos}
            removeAllPhotos={removeAllPhotos}
            removeImage={removeImage}
          />
        }
      </div>

      <Button 
        isValid={userInput.trim().length !== 0} 
        text={"Post"}
        style={{ borderRadius: "5px" }}
      />
    </form>
  )
};

export default WritePost;