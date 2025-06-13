import "./WriteQuestion.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import SubmitRating from "../Submit Rating/SubmitRating.jsx";
import Textarea from "../../Textarea/Textarea.jsx";
import Button from "../../Button/Button.jsx";
import Button2 from "../../Button 2/Button2.jsx";

function WriteQuestion(props) {
  const { 
    type, 
    userInput, handleUserInput, 
    rating, setRating, 
    handleIsActive, 
    handleSubmit, 
  } = props;

  return(
    <div className="WRITE_QUESTION">
      <div className="write-question_headline"> 
        <h2>{`Your ${type === "question" ? "Question" : "Review"}`}</h2>
        <Button2 onClick={() => handleIsActive()} text={"Close"} icon={faClose}/>
      </div>
      
      {type === "review" &&
        <SubmitRating 
          rating={rating} 
          setRating={setRating} 
        />
      }
      
      <Textarea 
        userInput={userInput} 
        onChange={handleUserInput}
      />

      <Button 
        isValid={ userInput.trim().length !== 0 && (rating !== undefined || type === "question") } 
        onClick={handleSubmit} 
        text={"Submit"}
      />
    </div>
  )
};

export default WriteQuestion;