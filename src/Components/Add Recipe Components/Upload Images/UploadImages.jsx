import "./UploadImages.css";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ClickableText from "../../Clickable Text/ClickableText.jsx";
import ShowMore from "../../Show More/ShowMore.jsx";
import ImageUpload from "../Image Upload/ImageUpload.jsx";
import Dropzone from "../../Upload Images/Dropzone/Dropzone.jsx";

/* This component is used in the recipe page for uploading images, and when a post is created.
When it's used for the recipe page recipe and setRecipe are passed down. Otherwise these two would be undefined.
The check used is (recipe ? recipe.images : photos)
*/

function UploadImages(props) {
  const { 
    recipe, 
    setRecipe, 
    photos, 
    setPhotos, 
    removeAllPhotos, 
    removeImage,
    multiple
  } = props;
 
  const location = useLocation().pathname;

  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState(true);
  const [draggedImage, setDraggedImage] = useState(false);

  const dropzoneRef = useRef(null);
  const inputRef = useRef(null);
 
  const handleShowImages = () => {
    setShowImages(!showImages);
  };

  const handleClickUpload = () => {
    inputRef.current.click();
  };  

  const formatSize = (size) => {
    let currentSize
    let unit

    if(size < 1024) {
      currentSize = size;
      unit = "Bytes"
    } 
    else if(size < 1048576) {
      currentSize = size / 1024
      unit = "KB"
    }
    else if(size < 1073741824) {
      currentSize = size / 1048576
      unit = "MB"
    }
    else {
      currentSize = size / 1073741824
      unit = "GB"
    }

    return `${(currentSize).toFixed(2)} ${unit}` 
  };

  const uploadImages = (images) => {
    // Make sure the user is not uploading more than 10 images.
    if(images.length > 10) {
      toast.error("You can only upload up to 10 images at once.");
      return;
    };

    const mappedImages = Array.from(images).filter((image) => {
      // Check if the file hasn't already been uploaded.
      const mappedPhotos = (recipe ? recipe.images : photos).filter((photo) => photo.name === image.name)
      
      if(mappedPhotos.length !== 0) {
        toast.error("The image has already been uploaded.");
        return;
      }
      
      // Make sure the file is an image.
      const allowedTypes = ["image/jpeg", "image/png"];
      if(!allowedTypes.includes(image.type)) {
        toast.error("Unsuported file type. Please choose .jpeg, or .png.");
        return false;
      };

      // Check that the file size doesn't exceed 5MB.
      const fileSize = image.size / (1024 * 1024);
      if(fileSize > 5) {
        toast.error("File size exceeds 5MB.");
        return false;
      };

      return true;
    }).map((image) => ({
      previewURL: URL.createObjectURL(image),
      name: image.name,
      size: formatSize(image.size),
      rawFile: image
    }));

    setImages((prevImages) => {
      return [...prevImages, ...mappedImages]
    });
  };

  // Handle the drop, drag over, and drag leave.
  const handleDrop = (e) => {
    e.preventDefault();
    uploadImages(e.dataTransfer.files);

    dropzoneRef?.current.classList.add("hover");
    setDraggedImage(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();

    dropzoneRef?.current.classList.add("drag-over");
    setDraggedImage(true);
  };

  const handleDragLeave = () => {
    dropzoneRef?.current.classList.remove("drag-over");
    setDraggedImage(false);
  };
  
  const selectImagesInput = (e) => {
    uploadImages(e.target.files);
  };

  return (
    <div className={location === "/add-recipe" ? "container" : "UPLOAD-IMAGES" }>
      {location === "/add-recipe" &&
        <>
          <h2>Photos <span>*</span></h2>
          <p>Attach at least 1 photo of your recipe.</p>
        </>
      }

      {(location.includes("add-recipe") || (location.includes("account") && images.length !== 1)) &&
        <Dropzone 
          dropzoneRef={dropzoneRef} 
          inputRef={inputRef}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          selectImagesInput={selectImagesInput}
          draggedImage={draggedImage}
          handleClickUpload={handleClickUpload}
          multiple={multiple}
        />
      }

      <ShowMore 
        text={"photo"} 
        items={images} 
        show={showImages} 
        setterFunction={handleShowImages} 
      />

      {showImages &&
        <>
          <div className="uploading-images_container">
            {
              images?.map((image) => {
                return ( 
                  <ImageUpload 
                    key={image.name}
                    recipe={recipe}
                    setRecipe={setRecipe}
                    photos={photos} 
                    setPhotos={setPhotos} 
                    images={images} 
                    setImages={setImages} 
                    image={image} 
                    removeImage={removeImage}
                  />
                )
              })
            }
          </div>

          {(recipe ? recipe.images : photos).length !== 0 && multiple &&
            <ClickableText text={"Remove all photos"} onClick={() => removeAllPhotos(setImages)}/>
          }
        </>
      }
    </div>
  )
};

export default UploadImages;