import "./FollowUser.css";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";
import Button from "../../Button/Button";

function FollowUser(props) {
  const { userData, user, userId } = props;

  const { backendUrl, handleCheckAuth } = useContext(AppContext);

  const [follow, setFollow] = useState(userData.following.includes(userId));

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

  useEffect(() => {
    setFollow(userData.following.includes(userId));
  }, [user])

  return ( 
    <Button 
      onClick={followUser}
      text={follow ? "Unfollow" : "Follow"} 
      type={follow ? "Unfollow" : "Follow"}
    />
  )
};

export default FollowUser;