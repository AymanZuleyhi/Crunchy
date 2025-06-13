import "./Post.css";
import axios from "axios";
import { toast } from "react-toastify";

import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { Helpers } from "../../../Context/Helpers.jsx";
import { AppContext } from "../../../Context/AppContext.jsx";
import ProfilePicture from "../../Profile Picture/ProfilePicture.jsx";
import Button2 from "../../Button 2/Button2.jsx";
import LikePost from "../Like Post/LikePost.jsx";
import CommentPost from "../Comment Post/CommentPost.jsx";
import WritePostReply from "../Write Post Reply/WritePostReply.jsx";
import ShowMore from "../../Show More/ShowMore.jsx";
import Reply from "../../Recipe Components/Reply/Reply.jsx";

function Post(props) {
  const { setPosts, user, getAllPosts } = props;
  const { author, text, photos, comments, upvotes, date, _id } = props.post;

  const location = useLocation().pathname.split("/")[1];

  const { convertDate } = useContext(Helpers);
  const { backendUrl, handleCheckAuth, userData } = useContext(AppContext);

  const [showLeaveComment, setShowLeaveComment] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleShowLeaveComment = () => {
    setShowLeaveComment(!showLeaveComment);
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="POST">
      <div className="post-user-info">
        <div className="post_name">
          <ProfilePicture userId={author.userId}/>
          
          <div>
            <p>{author.username}</p>
            <p>{date}</p>
          </div>
        </div>


      </div>

      <div className="post-body">
        <p>{text}</p>

        <div className="post-body_photos">
          {
            photos?.map((photo, i) => {
              return ( 
                <img key={i} src={photo}/>
              )
            })
          }
        </div>
      </div>

      <div className="post-controls">
        <LikePost 
          postId={_id} 
          upvotes={upvotes} 
          setPosts={setPosts}
          user={user}
          getAllPosts={getAllPosts}
        />
        
        <CommentPost 
          postId={_id} 
          showLeaveComment={showLeaveComment}
          handleShowLeaveComment={handleShowLeaveComment}
        />
      </div>

      {
        showLeaveComment &&
        <WritePostReply 
          toggle={handleShowLeaveComment}
          postId={_id}
          getAllPosts={getAllPosts}
          setPosts={setPosts}
        />
      }

      <ShowMore 
        text={"comment"}
        items={comments} 
        show={showComments}
        setterFunction={handleShowComments}
      />

      {showComments &&
        comments.map((comment) => {
          return (
            <Reply key={comment._id} reply={comment}/>
          )
        })
      }
    </div>
  )
};

export default Post;