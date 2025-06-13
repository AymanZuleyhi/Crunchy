import "./ImageUpload.css";
import axios from "axios";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import Button2 from "../../Button 2/Button2";

function ImageUpload(props) {
  const { recipe, setRecipe, photos, setPhotos, images, setImages, image, removeImage } = props;
  
  const uploadRef = useRef(false);

  const [percentComplete, setPercentComplete] = useState(0);

  const uploadImageToCloudinary = async (file) => {
    const uploadPreset = "Crunchy";
    const endpoint = "https://api.cloudinary.com/v1_1/dhzq0yjf2/image/upload";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try{
      const response = await axios.post(endpoint, formData, {
        onUploadProgress: (progressEvent) => {
          const percentComplete = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          )
          
          setPercentComplete(percentComplete);
        }
      });

      const url = response.data.secure_url; // The image url from Cloudinary.
  
      // Add the image's name and url to the array.
      if(recipe) {
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          images: [...prevRecipe.images, {name: image.name, url}]
        }));
      } else {
        setPhotos((prevPhotos) => {
          return [...prevPhotos, { name: image.name, url }]
        });
      };
    }catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Prevent the images from being uploaded more than once.
    if(!uploadRef.current) {
      // Check if the image has already been uploaded.
      const doesExist = (recipe ? recipe.images : photos).find((photo) => photo.name === image.name);
      
      // If the image has already been uploaded set the loading bar to 100%.
      if(doesExist) {
        setPercentComplete(100);
        return;
      }

      uploadImageToCloudinary(image.rawFile);
      uploadRef.current = true;
    };
  }, []);

  return (
    <div className="EACH-UPLOADED-IMAGE" key={image.name}>
      <img style={{ filter: percentComplete === 100 ? "blur(0px)" : "blur(0.9px)"}} src={image.previewURL} />
      
      <div className="content">
        <p>{image.name}</p>
        <p>{image.size}</p>

        {percentComplete !== 100 &&
          <div className="progress-bar_container">
            <div style={{ width: `${percentComplete}%` }}></div>
          </div>
        }
      </div>

      <Button2 
        onClick={() => removeImage(image, setImages)} 
        icon={faClose} 
        text={"Remove"}
        type={"button"}
      />
    </div>
  )
};

export default ImageUpload;