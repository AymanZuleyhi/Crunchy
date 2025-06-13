import "./FollowingUsers.css";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";
import { AppDataContext } from "../../../Context/AppDataContext.jsx";
import FollowingUser from "../Following User/FollowingUser.jsx";

function FollowingUsers(props) {
  const { user, setMenu } = props;
  const [users, setUsers] = useState([]);

  const { userData } = useContext(AppContext);
  const { fetchUsersById } = useContext(AppDataContext);

  useEffect(() => {
    fetchUsersById(user.following, setUsers);
  }, [])

  return (
    <div className={`FOLLOWING-USERS ${users.length === 0 ? "empty" : "not-empty"}`}>
      {user.following.length === 0 &&
        <div>
          <p>{`${user._id === userData._id ? "You do" : "The user does" } not follow anyone.`}</p>
        </div>
      }
      {
        users.map((user) => {
          return (
            <FollowingUser 
              key={user._id} 
              user={user} 
              setMenu={setMenu}
            />
          )
        })
      }
    </div>
  )
};

export default FollowingUsers;