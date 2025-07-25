import "./Account.css"
import axios from "axios";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { AppDataContext } from "../../Context/AppDataContext.jsx";
import { Helpers } from "../../Context/Helpers.jsx";
import NavMenu from "../../Components/Nav Menu/NavMenu.jsx";
import Recipes from "../../Components/All Recipes/Recipes.jsx";
import FollowingUsers from "../../Components/Account Components/Following Users/FollowingUsers.jsx";
import AllPosts from "../../Components/News Feed Components/All Posts/AllPosts.jsx";
import UploadPicture from "../../Components/Account Components/Upload Picture/UploadPicture.jsx";
import AccountCoverPhoto from "../../Components/Account Components/Account Cover Photo/AccountCoverPhoto.jsx";
import UserProfile from "../../Components/Account Components/User Profile/UserProfile.jsx";
import Button from "../../Components/Button/Button.jsx";

function Account() {
  const { userData, backendUrl } = useContext(AppContext);
  const { fetchUserById } = useContext(AppDataContext);
  const { setShowBlackScreen } = useContext(Helpers);

  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[2];

  const [showUploadPicture, setShowUploadPicture] = useState({
    show: false,
    type: ""
  });

  const handleShowUploadPicture = (type) => {
    setShowBlackScreen(showUploadPicture.show ? false : true);

    setShowUploadPicture((prevPictures) => ({
      show: prevPictures.show ? false : true,
      type: type 
    }));
  };

  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [posts, setPosts] = useState([]);
  const [menu, setMenu] = useState([
    { name: "Recipes", active: true },
    { name: "Favorites", active: false },
    { name: "Posts", active: false },
    { name: "Following", active: false }
  ]);

  const fetchPostsById = async () => {
    if(user?.posts.uploaded.length === 0) {
      setPosts([]);
    };

    const url = `${backendUrl}/news-feed/get-posts-by-id`;

    try {
      const { data } = await axios.post(url, 
        { postIds: user?.posts.uploaded }
      );

      if(data.success) {
        setPosts(data.posts);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (location === userData?._id) {
      setUser(userData);
    } else {
      fetchUserById(location, setUser);
    }
  }, [userData, location]);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchPostsById();
  }, [userData, menu, user, location]);

  if(!user) {
    return (
      <div className="user-not-found">
        <h1>The user's account is no longer active.🥲</h1>
        <Button text={"Go Back"} icon={faArrowLeft} onClick={handleGoBack}/>
      </div>
    )
  };

  if(!userData) {
    return <div></div>
  };
  
  return (
    <div className="ACCOUNT">
      <AccountCoverPhoto 
        userData={userData} 
        user={user} 
        handleShowUploadPicture={handleShowUploadPicture}
      />

      {showUploadPicture.show &&
        <UploadPicture
          type={showUploadPicture.type} 
          handleShowUploadPicture={handleShowUploadPicture}/>
      }
  
      <UserProfile 
        userData={userData}
        user={user}
        handleShowUploadPicture={handleShowUploadPicture}  
      />

      <NavMenu menu={menu} setMenu={setMenu} />

      {
        menu.some((item) => item.name === "Recipes" && item.active) &&
        <Recipes type={"uploads"} user={user} recipes={recipes} setRecipes={setRecipes}/>
      }

      {
        menu.some((item) => item.name === "Favorites" && item.active) &&
        <Recipes type={"favourites"} user={user} recipes={recipes} setRecipes={setRecipes}/>
      }

      {menu.some((item) => item.name === "Posts" && item.active) &&
        <AllPosts user={user} posts={posts} fetchContent={fetchPostsById}/>
      }

      {
        menu.some((item) => item.name === "Following" && item.active) &&
        <FollowingUsers setMenu={setMenu} user={user}/>
      }
    </div>
  )
}

export default Account;