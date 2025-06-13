import "./SubmitQuestion.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import { AppDataContext } from "../../../Context/AppDataContext.jsx";
import { AppContext } from "../../../Context/AppContext.jsx";
import { Helpers } from "../../../Context/Helpers.jsx";
import WriteQuestion from "../Write Question/WriteQuestion.jsx";
import ProfilePicture from "../../Profile Picture/ProfilePicture.jsx";

function SubmitQuestion(props) {
  const { type, fetchContent } = props;

  const { id } = useContext(AppDataContext);
  
  const { setShowBlackScreen } = useContext(Helpers);
  const { backendUrl, userData } = useContext(AppContext);

  const [isActive, setIsActive] = useState(false);
  const [rating, setRating] = useState();
  const [userInput, setUserInput] = useState("");

  const handleIsActive = () => {
    setIsActive(!isActive);
    setUserInput("");
    setRating();
    setShowBlackScreen(!isActive ? true : false);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const submitQuestionToDb = async () => {
    const url = `${backendUrl}/recipe/add-comment/${id}`;

    try{
      const { data } = await axios.post(url,
        { type, text: userInput, rating }, 
        { withCredentials: true }
      );

      if(data.success) {
        handleIsActive();
        setShowBlackScreen();
        toast(data.message);
        fetchContent();
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  return (
    <div className="SUBMIT_QUESTION">
      <ProfilePicture />
      
      <div onClick={() => handleIsActive()} className="question_field">
        <p>{`Submit your ${type === "question" ? "question" : "review"} here`}</p>
      </div>

      {isActive &&
        <WriteQuestion 
          type={type} 
          userInput={userInput} handleUserInput={handleUserInput}
          rating={rating} setRating={setRating}
          handleIsActive={handleIsActive}
          handleSubmit={submitQuestionToDb} 
        />
      }
    </div>
  )
};

export default SubmitQuestion;