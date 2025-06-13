import "./Like.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

function Like(props) {
  const { upvotes, handleLike } = props;

  const { userData } = useContext(AppContext);

  return(
    <div onClick={handleLike} className={`LIKE ${upvotes.includes(userData?._id) ? "liked" : "not-liked"}`}>
      <FontAwesomeIcon icon={faThumbsUp}/>
      <p>{upvotes.length !== 0 ? upvotes.length : "Like"}</p>
    </div>
  )
};

export default Like;