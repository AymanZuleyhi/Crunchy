import "./UploadRecipeImages.css";
import { useContext } from "react";
import { RecipeContext } from "../../../Context/RecipeContext";
import UploadImages from "../Upload Images/UploadImages.jsx";

function UploadRecipeImages() {
  const { recipe, setRecipe } = useContext(RecipeContext);

  const removeAllPhotos = (setImages) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      images: []
    }));

    setImages([]);
  };

  const removeImage = (image, setImages) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      images: prevRecipe.images.filter((photo) => photo.name !== image.name)
    }));

    setImages((prevImages) => {
      return prevImages.filter((photo) => photo.rawFile.name !== image.name)
    });
  };
  
  return (
    <UploadImages 
      recipe={recipe}
      setRecipe={setRecipe} 
      removeAllPhotos={removeAllPhotos}
      removeImage={removeImage}
      multiple={true}
    />
  )
};

export default UploadRecipeImages;