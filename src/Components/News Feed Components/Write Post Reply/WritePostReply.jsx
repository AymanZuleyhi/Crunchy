import "./WritePostReply.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";
import Button from "../../Button/Button";
import Input2 from "../../Input2/Input2.jsx";
import ProfilePicture from "../../Profile Picture/ProfilePicture";

function WritePostReply(props) {
  const { toggle, postId, getAllPosts, setPosts } = props;

  const { backendUrl, userData } = useContext(AppContext);

  const location = useLocation().pathname.split("/")[1];

  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };
  
  const submitReply = async () => {
    const url = `${backendUrl}/news-feed/comment-post/${postId}`;

    try {
      const { data } = await axios.post(url, 
        { text: userInput },
        { withCredentials: true }
      );

      if(data.success) {
        location === "account" ? getAllPosts(userData.posts.uploaded, setPosts) : getAllPosts();

        toast(data.message)
        toggle();
      };
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className="WRITE-REPLY">
      <div className="write-reply_profile-pic-input">
        <ProfilePicture />
        <Input2 
          userInput={userInput}
          onChange={handleUserInput}
        />
      </div>

      <div className="write-reply_controls">
        <p onClick={toggle}>Cancel</p>

        <Button 
          isValid={userInput.trim().length !== 0}
          onClick={submitReply} 
          text={"Submit"}
        />
      </div>
    </div>
  )
};

export default WritePostReply;