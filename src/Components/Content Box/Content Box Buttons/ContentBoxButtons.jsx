import "./ContentBoxButtons.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";
import Comment from "../../Comment/Comment";
import Like from "../../LIke/Like";

function ContentBoxButtons(props) {
  const { upvotes } = props.content;
  const { type, isActive, handleIsActive, contentId, fetchContent } = props;

  const location = useLocation().pathname.split("/")[2];

  const { backendUrl } = useContext(AppContext);

  const generateUrl = () => {
    const url = type === "post" 
    ? `${backendUrl}/news-feed/like-post/${contentId}`
    : `${backendUrl}/recipe/like-comment/${location}/${contentId}`;

    return url;
  };

  const handleLike = async () => {
    try{
      const { data } = await axios.post(generateUrl(), 
        { type },
        { withCredentials: true }
      );
      
      if(data.success) {
        fetchContent();
      };
    } catch (error) {
      console.error(error.message);
    };
  };

  return (
    <div className="CONTENT-BOX_BUTTONS">
      <Like handleLike={handleLike} upvotes={upvotes}/>
      <Comment isActive={isActive} handleIsActive={handleIsActive}/>
    </div>
  )
};

export default ContentBoxButtons;