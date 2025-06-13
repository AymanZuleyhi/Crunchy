import "./UserProfile.css";
import AccountProfilePicture from "../Account Profile Picture/AccountProfilePicture.jsx";
import FollowUser from "../Follow User/FollowUser.jsx";
import SocialIcons from "../Social Icons/SocialIcons";

function UserProfile(props) {
  const { userData, user, handleShowUploadPicture } = props;

  return (
    <div className="USER-PROFILE">
      <AccountProfilePicture userData={userData} user={user} handleShowUploadPicture={handleShowUploadPicture}/>

      <div className="user-info">
        <div className="name-and-description">
          <div className="user_headline">
            <h1>{user.name}</h1>
            <SocialIcons socialLinks={user.socialLinks}/>
          </div>

          <p className="bio">{user.bio}</p>

          {user._id !== userData._id &&
            <FollowUser userData={userData} user={user} userId={user._id}/>
          }
        </div>
      </div>
    </div>
  )
};

export default UserProfile;