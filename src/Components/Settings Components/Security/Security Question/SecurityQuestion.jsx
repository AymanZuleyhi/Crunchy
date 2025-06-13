import "./SecurityQuestion.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faX, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button2 from "../../../Button 2/Button2.jsx";
import Input2 from "../../../Input2/Input2.jsx";

function SecurityQuestion(props) {
  const { question, i, removeSecurityQuestion, editSecurityQuestion } = props;
  const [editQuestion, setEditQuestion] = useState(false);
  const [userInput, setUserInput] = useState(question.answer);

  const handleEditAnswer = () => {
    setEditQuestion(!editQuestion);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="SECURITY-QUESTION">
      {!editQuestion &&
        <p>{`${i + 1}. ${question.question}`}</p>
      }

      {editQuestion &&
        <Input2 userInput={userInput} onChange={handleUserInput}/>
      }
      
      <div className="security-questions_controls">
        <Button2 
          icon={editQuestion ? faCheckCircle : faPencil} 
          text={editQuestion ? "Save" : "Edit answer"} 
          onClick={
            editQuestion ? 
            () => {editSecurityQuestion(question, userInput), handleEditAnswer()} 
            : handleEditAnswer
          }
        />

        <Button2 
          icon={faX} 
          text={editQuestion ? "Cancel" : "Remove"} 
          onClick={editQuestion ? handleEditAnswer : () => removeSecurityQuestion(question)} 
        />
      </div>
    </div>
  )
};

export default SecurityQuestion;