import "./CommentPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

function CommentPost(props) {
  const { showLeaveComment, handleShowLeaveComment } = props;

  return (
    <div onClick={handleShowLeaveComment} className={`COMMENT ${showLeaveComment ? "active" : "not-active" }`}>
      <FontAwesomeIcon icon={faComment}/>
      <p>Comment</p>
    </div>
  )
};

export default CommentPost;