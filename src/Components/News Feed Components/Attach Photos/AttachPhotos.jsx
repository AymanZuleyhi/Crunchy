import "./AttachPhotos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function AttachPhotos(props) {
  const { showAttachPhotos, handeleShowAttachPhotos } = props;

  return (
    <div onClick={handeleShowAttachPhotos} className="ATTACH-PHOTOS">
      <FontAwesomeIcon icon={faImage}/>
      <p>{showAttachPhotos ? "Don’t want to attach photos anymore" : "Want to attach photos to your post?"}</p>
      <FontAwesomeIcon icon={showAttachPhotos ? faChevronUp : faChevronDown}/>
    </div>
  )
};

export default AttachPhotos;