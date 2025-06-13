import "./CreatePost.css";
import { useContext, useState } from "react";
import ProfilePicture from "../../Profile Picture/ProfilePicture.jsx";
import WritePost from "../Write Post/WritePost.jsx";
import { Helpers } from "../../../Context/Helpers.jsx";

function CreatePost(props) {
  const { getAllPosts } = props;
  const { setShowBlackScreen } = useContext(Helpers);
  const [showWritePost, setShowWritePost] = useState(false);

  const handleShowWritePost = () => {
    setShowWritePost(!showWritePost);
    setShowBlackScreen(showWritePost ? false : true);
  };

  return (
    <div className="CREATE-POST">
      <ProfilePicture />

      <div className="create-post" onClick={handleShowWritePost}>
        <p>What's on your mind ...</p>
      </div>

      {/* {showWritePost && */}
        // <WritePost handleShowWritePost={handleShowWritePost} getAllPosts={getAllPosts}/>
      // }
    </div>
  )
};

export default CreatePost;