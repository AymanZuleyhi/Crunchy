import "./ProfilePicture.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { AppDataContext } from "../../Context/AppDataContext.jsx";

function ProfilePicture(props) {
  const { userId, isActive, onClick } = props;

  const { userData } = useContext(AppContext);
  const { fetchUserById  } = useContext(AppDataContext);

  const [user, setUser] = useState();

  const navigate = useNavigate();
  
  useEffect(() => {
    if(userId) {
      fetchUserById(userId, setUser);
    } else {
      setUser(userData);
    };
  }, [userId, userData])

  const navigateToAccount = () => {
    if(onClick) {
      onClick();
    } else {
      navigate(userId ? `/account/${userId}` : `/account/${userData?._id}`);
    };
  };

  return(
    <div onClick={navigateToAccount} className={`PROFILE-PICTURE ${isActive ? "active" : "not-active"}`} >
      {user?.pictures.profile !== "" &&
        <img src={user?.pictures.profile}/>
      }

      {user?.pictures.profile === "" &&
        <p>{user?.name.split("")[0]}</p>
      }
    </div>
  )
};

export default ProfilePicture;