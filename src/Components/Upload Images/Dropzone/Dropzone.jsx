import "./Dropzone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import DropzoneInformation from "../Dropzone Information/DropzoneInformation.jsx";

function Dropzone(props) {
  const { 
    dropzoneRef, 
    inputRef, 
    handleDrop, 
    handleDragOver, 
    handleDragLeave, 
    selectImagesInput, 
    draggedImage, 
    handleClickUpload,
    multiple
  } = props;

  return (
    <div className="DROPZONE">
      <div className="dropzone-container" ref={dropzoneRef} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
        <FontAwesomeIcon icon={faDownload} />
        
        <input 
          ref={inputRef}  
          type={"file"} 
          multiple={multiple}
          onChange={selectImagesInput} 
          style={{ display: "none" }} 
        />
        {draggedImage ? "Drop the image here" : <p><span style={{ color: "black"}} onClick={handleClickUpload}>Choose a photo</span>, or drag it here.</p>}
      </div>

      <DropzoneInformation />
    </div>
  )
};

export default Dropzone;