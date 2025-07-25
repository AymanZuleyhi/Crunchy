import "./ContentSubmissionBox.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Helpers } from "../../Context/Helpers.jsx";
import { AppContext } from "../../Context/AppContext.jsx";
import ProfilePicture from "../Profile Picture/ProfilePicture";
import ContentSubmitter from "../Content Submitter/ContentSubmitter.jsx";

function ContentSubmissionBox(props) {
  const { type, fetchContent } = props;

  const [isActive, setIsActive] = useState(false);
  const { setShowBlackScreen } = useContext(Helpers);

  const { logedIn } = useContext(AppContext);

  const navigate = useNavigate();

  const handleIsActive = () => {
    if(!logedIn) {
      navigate("/login");
      return;
    }

    setIsActive(!isActive);
    setShowBlackScreen(isActive ? false : true);
  };

  return (
    <>
      <div onClick={handleIsActive} className="CONTENT-SUBMISSION-BOX">
        <ProfilePicture />

        <div className="content-submitter">
          <p>What's on your mind?</p>
        </div>
      </div>

      {isActive &&
        <ContentSubmitter 
          type={type} 
          handleIsActive={handleIsActive} 
          fetchContent={fetchContent}
        />
      }
    </>
  )
};

export default ContentSubmissionBox;