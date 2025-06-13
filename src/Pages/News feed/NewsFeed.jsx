import "./NewsFeed.css";
import { faHouse, faFire, faClock, faUsers, faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import AllPosts from "../../Components/News Feed Components/All Posts/AllPosts.jsx";
import SidebarMenu from "../../Components/News Feed Components/Sidebar Menu/SidebarMenu.jsx";
import NavMenu from "../../Components/Nav Menu/NavMenu.jsx";
import Button from "../../Components/Button/Button.jsx";
import ContentSubmissionBox from "../../Components/Content Submission Box/ContentSubmissionBox.jsx";

function NewsFeed() {
  const { backendUrl, userData } = useContext(AppContext);
  
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState(0);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);

  const [sidebarMenu, setSidebarMenu] = useState([
    { name: "All", icon: faHouse, active: true },
    { name: "Hot", icon: faFire, active: false },
    { name: "New", icon: faClock, active: false },
    { name: "Following", icon: faUsers, active: false },
    { name: "Saved", icon: faBookmark, active: false },
    { name: "Hidden", icon: faEyeSlash, active: false }
  ]);

  const generateUrl = () => {
    const activeTab = sidebarMenu.find((item) => item.active).name;

    let type

    switch(activeTab) {
      case "All": {
        type = "all";
        break;
      }
      case "Hot": {
        type = "hot";
        break;
      }
      case "New": {
        type = "new";
        break;
      }
      case "Following": {
        type = "following";
        break;
      }
      case "Saved": {
        type = "saved";
        break;
      }
      case "Hidden": {
        type = "hidden"
        break;
      }
    }

    const url = `${backendUrl}/news-feed/all-posts/${type}?limit=${limit}&skip=${skip}`;

    return url;
  };

  const getAllPosts = async () => {
    try {
      const { data } = await axios.post(generateUrl(), 
        {} ,
        { withCredentials: true }
      );

      if(data.success) {
        setPosts(data.posts);
        setAllPosts(data.allPosts);
        setLimit(limit + 6);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [sidebarMenu, userData]);

  return (
    <div className="NEWS-FEED">
      <SidebarMenu 
        sidebarMenu={sidebarMenu} 
        setSidebarMenu={setSidebarMenu}
      />

      <NavMenu 
        menu={sidebarMenu} 
        setMenu={setSidebarMenu}
      />

      <div className="news-feed_middle">
        <ContentSubmissionBox type={"post"} fetchContent={getAllPosts}/>
        
        <AllPosts posts={posts} fetchContent={getAllPosts}/>

        {posts.length > allPosts &&
          <Button 
            isValid={posts.length < allPosts.length ? true : false}
            text={"Show more"} 
            style={{ borderRadius: "5px" }}
          />
        }

        {posts.length >= allPosts &&
          <p>You've seen all of the avaialble posts.</p>
        }
      </div>
    </div>
  )
}

export default NewsFeed;