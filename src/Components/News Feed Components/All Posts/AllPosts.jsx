import "./AllPosts.css";
import { useLocation } from "react-router-dom";
import ContentBox from "../../Content Box/ContentBox.jsx";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";

function AllPosts(props) {
  const { user, posts, fetchContent } = props;

  const { userData } = useContext(AppContext);

  const location = useLocation().pathname.split("/")[1];

  return (
    <div className={`ALL-POSTS ${location === "account" ? `account ${posts.length === 0 ? "empty" : "not-empty"}` : "news-feed"}`}>
      {
        posts.length === 0 && user &&
        <p>{`${user._id === userData?._id 
          ? `${"You haven't"} uploaded any posts.` 
          : `${"The user hasn't"} uploaded any posts`
        }`}</p>
      }
      {
        posts.map((post) => {
          return (
            <ContentBox
              key={post._id} 
              type={"post"}
              content={post}
              fetchContent={fetchContent}
            />
          )
        })
      }
    </div>
  )
};

export default AllPosts;