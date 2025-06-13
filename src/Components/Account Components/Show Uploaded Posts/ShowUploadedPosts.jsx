import "./ShowUploadedPosts.css";
import { useState, useEffect, useContext } from "react";
import { Helpers } from "../../../Context/Helpers";
import Post from "../../News Feed Components/Post/Post.jsx";

function ShowUploadedPosts(props) {
  const { user } = props;

  const { fetchMultiplePostsById } = useContext(Helpers);

  const [posts, setPosts] = useState();

  useEffect(() => {
    fetchMultiplePostsById(user.posts.uploaded, setPosts);
  }, [])

  return (
    <div className="UPLOADED-POSTS">
      {
        posts?.map((post) => {
          return (
            <Post key={post._id} post={post}/>
          )
        })
      }
    </div>
  )
};

export default ShowUploadedPosts;