import "./EnterSecurityQuestion.css";
import { useState } from "react";
import Input2 from "../../../Input2/Input2.jsx";
import Button from "../../../Button/Button.jsx";

function EnterSecurityQuestion(props) {
  const { handleWriteQuestions, handleSubmitQuestion } = props;
  const [userInput, setUserInput] = useState({
    question: "",
    answer: ""
  });

  const handleUserInput = (e) => {
    setUserInput((prevInput) => {
      return {...prevInput, question: e.target.value}
    });
  };

  const submitNewQuestion = (e) => {
    e.preventDefault();

    setUserInput((prevInput) => ({
      ...prevInput,
      question: userInput.question
    }));
  };

  return (
    <>
      <form onSubmit={submitNewQuestion} className="ENTER-SECURITY-QUESTION">
        <p>Submit your own question</p>
        <Input2 
          onChange={handleUserInput} 
          value={userInput.question} 
          placeholder={"Your question"}
        />
        
        <div>
          <p onClick={handleWriteQuestions}>Cancel</p>
          <Button 
            text={"Submit"}
          />
        </div>
      </form>
    </>

  )
};

export default EnterSecurityQuestion;