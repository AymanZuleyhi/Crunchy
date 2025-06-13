import "./ContentSubmissionBox.css";
import { useState, useContext } from "react";
import ProfilePicture from "../Profile Picture/ProfilePicture";
import ContentSubmitter from "../Content Submitter/ContentSubmitter.jsx";
import { Helpers } from "../../Context/Helpers.jsx";

function ContentSubmissionBox(props) {
  const { type, fetchContent } = props;

  const [isActive, setIsActive] = useState(false);
  const { setShowBlackScreen } = useContext(Helpers);

  const handleIsActive = () => {
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