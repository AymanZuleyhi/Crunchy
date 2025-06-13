import "./LikePost.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function LikePost(props) {
  const { postId, upvotes, setPosts, user, getAllPosts } = props;

  const location = useLocation().pathname;

  const { backendUrl, userData } = useContext(AppContext);
  
  const likePost = async () => {
    const url = `${backendUrl}/news-feed/like-post/${postId}`;

    try {
      const { data } = await axios.post(url, 
        {}, 
        { withCredentials: true }
      );

      if(data.success) {
        if(location !== "/news-feed") {
          getAllPosts(user.posts.uploaded, setPosts);
        } else {
          getAllPosts();
        }
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  return (
    <div onClick={likePost} className={`LIKE ${upvotes.includes(userData._id) ? "liked" : "not-liked"}`}>
      <FontAwesomeIcon icon={faThumbsUp}/>
      <p>{upvotes.length !== 0 ? upvotes.length : "Like"}</p>
    </div>
  )
};

export default LikePost;