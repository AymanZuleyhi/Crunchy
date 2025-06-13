import "./UserInformation.css";
import ProfilePicture from "../../Profile Picture/ProfilePicture.jsx";

function UserInformation(props) {
  const { author, description } = props;

  return(
    <div className="container">
      <div className="user-information">
        <ProfilePicture userId={author.userId}/>
        <p className="author-name">{author.username}</p>
      </div>

      <div className="user-description">
        <p>{description}</p>
      </div>
    </div>
  )
};

export default UserInformation;