import "./WriteReply.css";
import { useState } from "react";
import Button from "../../Button/Button";
import Input2 from "../../Input2/Input2.jsx";
import ProfilePicture from "../../Profile Picture/ProfilePicture.jsx";

function WriteReply(props) {
  const { userInput, handleUserInput, handleIsActive, handleSubmit } = props;

  return(
    <div className="WRITE-REPLY">
      <div className="write-reply_profile-pic-input">
        <ProfilePicture />

        <Input2 
          userInput={userInput} 
          onChange={handleUserInput}
        />
      </div>

      <div className="write-reply_controls">
        <p onClick={handleIsActive}>Cancel</p>

        <Button 
          onClick={handleSubmit} 
          isValid={ userInput.trim().length !== 0 } 
          text={"Reply"}
        />
      </div>

    </div>
  )
};

export default WriteReply;