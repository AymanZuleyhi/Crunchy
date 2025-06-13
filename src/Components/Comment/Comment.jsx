import "./Comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

function Comment(props) {
  const { isActive, handleIsActive } = props;

  return(
    <div onClick={handleIsActive} className={`COMMENT ${isActive ? "active" : "not-active" }`}>
      <FontAwesomeIcon icon={faComment}/>
      <p>Comment</p>
    </div>
  )
};

export default Comment;