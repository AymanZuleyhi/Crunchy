import "./ContentBox.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import WriteReply from "../Recipe Components/Write Reply/WriteReply.jsx";
import ShowMore from "../Show More/ShowMore.jsx";
import Reply from "../Recipe Components/Reply/Reply.jsx";
import ContentBoxHeadline from "./Content Box Headline/ContentBoxHeadline.jsx";
import ContentBoxButtons from "./Content Box Buttons/ContentBoxButtons.jsx";
import ClickableText from "../Clickable Text/ClickableText.jsx";

function ContentBox(props) {
  const { type, fetchContent } = props;
  const { text, replies, _id } = props.content;

  const location = useLocation().pathname.split("/");

  const { backendUrl } = useContext(AppContext);

  const [userInput, setUserInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [numberOfReplies, setNumberOfReplies] = useState(5);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleIsActive = () => {
    setIsActive(!isActive);
    setUserInput("");
  };

  const handleShowReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleSubmitReply = async () => {
    const url = (location[1] === "account" || location[1] === "news-feed") 
    ? `${backendUrl}/news-feed/comment-post/${_id}`
    : `${backendUrl}/recipe/add-reply/${location[2]}/${_id}`; 

    try{
      const { data } = await axios.post(url,
        { type, text: userInput }, 
        { withCredentials: true }
      );

      if(data.success) {
        toast(data.message);
        fetchContent();
        handleIsActive();
      };
    } catch (error) {
      console.error(error.message);
    }
  };

  const showMoreReplies = () => {
    setNumberOfReplies(replies.length >= numberOfReplies 
      ? numberOfReplies + 5
      : numberOfReplies - 5);
  };

  return (
    <div className={`CONTENT-BOX ${type === "post" ? "post" : "not-post"}`}>          
        <ContentBoxHeadline type={type} content={props.content}/>

        <p className="content-box_text">{text}</p>

        <ContentBoxButtons 
          content={props.content} 
          isActive={isActive} 
          handleIsActive={handleIsActive} 
          type={type}
          contentId={_id}
          fetchContent={fetchContent}
        />

        {isActive && 
          <WriteReply 
            userInput={userInput} handleUserInput={handleUserInput} 
            handleIsActive={handleIsActive}
            handleSubmit={handleSubmitReply}
          />
        }
        
        <ShowMore 
          text={"Reply"} 
          items={replies} 
          show={showReplies} 
          setterFunction={handleShowReplies} 
        />

        {showReplies &&
          <div className="replies_container">
            <div className="all-replies">
              {replies.map((reply, i) => {
                  if(i < numberOfReplies) {
                    return (
                      <Reply key={reply._id} reply={reply}/>
                    )
                  }
                })
              }
            </div>

            {replies.length >= 6 &&
              <ClickableText text={replies.length >= numberOfReplies ? "Show More" : "Show Less"} onClick={showMoreReplies}/>
            }
          </div>
        }
    </div>
  )
};

export default ContentBox;