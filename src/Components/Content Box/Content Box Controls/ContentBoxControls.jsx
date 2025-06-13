import "./ContentBoxControls.css";
import { toast } from "react-toastify";
import axios from "axios";
import { faXmark, faBookmark, faEyeSlash  } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";
import Button2 from "../../Button 2/Button2";

function ContentBoxControls(props) {
  const { contentId } = props;

  const location = useLocation().pathname.split("/")[1];

  const { userData, backendUrl, handleCheckAuth } = useContext(AppContext);

  const saveToFavourites = async () => {
    const url = `${backendUrl}/news-feed/add-remove-from-favourites/${contentId}`;

    try {
      const { data } = await axios.post(url,
        {}, 
        { withCredentials: true }
      );

      if(data.success) {
        toast(data.message);
        handleCheckAuth();
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  const hideShowPost = async () => {
    const url = `${backendUrl}/news-feed/show-hide-post/${contentId}`

    try {
      const { data } = await axios.post(url, 
        {},
        { withCredentials: true }
      );

      if(data.success) {
        handleCheckAuth();
      }
    } catch(error) {
      console.error(error.message);
    }
  };

  return (
    <div className="CONTENT-BOX_CONTROLS">
      <Button2 
        onClick={saveToFavourites} 
        text={userData?.posts.favourites.includes(contentId) ? "Unsave" : "Save"} 
        icon={userData?.posts.favourites.includes(contentId) ? faBookmark : bookmarkRegular}
      />

      {location !== "account" &&
        <Button2 
          onClick={hideShowPost} 
          text={userData?.posts.hidden.includes(contentId) ? "Show" : "Hide"} 
          icon={userData?.posts.hidden.includes(contentId) ? faEyeSlash : faXmark}
        />
      }
    </div>
  )
};

export default ContentBoxControls;