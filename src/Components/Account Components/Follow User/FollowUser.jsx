import "./FollowUser.css";
import axios from "axios";
import { useState, useContext } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";
import Button from "../../Button/Button";

function FollowUser(props) {
  const { userData, user, userId } = props;

  const { backendUrl, handleCheckAuth } = useContext(AppContext);

  const [follow, setFollow] = useState(!userData.following.includes(userId) ? true : false);

  const followUser = async () => {
    const url = `${backendUrl}/user/follow-user/${userId}`;

    try {
      const { data } = await axios.post(url, 
        {},
        { withCredentials: true }
      );

      if(data.success) {
        setFollow(data.follow);
        handleCheckAuth();
      };
    } catch(error) {
      console.error(error.message);
    };
  };

  return ( 
    <Button 
      onClick={followUser}
      text={follow ? "Follow" : "Unfollow"} 
      follow={follow}
    />
  )
};

export default FollowUser;