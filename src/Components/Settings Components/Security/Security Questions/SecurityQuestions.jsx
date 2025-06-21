import "./SecurityQuestions.css";
import { useState, useContext } from "react";
import ShowMore from "../../../Show More/ShowMore.jsx";
import SecurityQuestion from "../Security Question/SecurityQuestion.jsx";
import Button from "../../../Button/Button.jsx";
import Dropdown2 from "../../../Dropdown 2/Dropdown2.jsx";
import Input from "../../../Input/Input.jsx";
import axios from "axios";
import { AppContext } from "../../../../Context/AppContext.jsx";
import { toast } from "react-toastify";

function SecurityQuestions() {
  const { userData, handleCheckAuth,  backendUrl } = useContext(AppContext);
 
  const [securityQuestions, setSecurityQuestions] = useState([
    { name: "What is the name of the street you grew up on?", active: true }, 
    { name: "What was the name of your first pet?", active: false }, 
    { name: "What is your mother's maiden name?", active: false }, 
    { name: "What was the name of your elementary school?", active: false }, 
    { name: "What was the make and model of your first car?", active: false }
  ]);

  const [showSelectedQuestions, setShowSelectedQuestions] = useState(false);

  const [selectedQuestions, setSelectedQuestion] = useState([]);

  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleShowSelectedQuestions = () => {
    setShowSelectedQuestions(!showSelectedQuestions);
  };

  const addQuestion = (e) => {
    e.preventDefault();

    const selectedQuestion = securityQuestions.find((question) => question.active).name;

    setSelectedQuestion((prevQuestions) => [...prevQuestions, { question: selectedQuestion, answer: userInput }]);

    setSecurityQuestions((prevQuestions) => {
      return prevQuestions.filter((question) => question.name !== selectedQuestion);
    });

    setSecurityQuestions((prevQuestions) => {
      return prevQuestions.map((question, i) => {
        return i === 0
        ? {...question, active: true}
        : {...question, active: false}
      })
    });

    setUserInput("");
  };

  const editSecurityQuestion = (question, userInput) => {
    setSelectedQuestion((prevQuestions) => {
      return prevQuestions.map((eachQuestion) => {
        return eachQuestion.question === question.question
        ? { ...eachQuestion, answer: userInput }
        : eachQuestion 
      })
    });
  };

  const removeSecurityQuestion = (question) => {
    // Remove the question from the selected questions.
    setSelectedQuestion((prevQuestions) => {
      return prevQuestions.filter((eachQuestion) => eachQuestion.question !== question.question )
    });

    // Add the question back to the selectable questions.
    setSecurityQuestions((prevQuestions) => [...prevQuestions, { name: question.question, active: false }]);
  };

  const saveQuestions = async () => {
    const url = `${backendUrl}/auth/set-security-questions`;

    try {
      const { data } = await axios.post(url, 
        { selectedQuestions },
        { withCredentials: true }
      );

      if(data.success) {
        toast(data.message);
        handleCheckAuth();
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  if(!userData) {
    return <div></div>
  }

  return (
    <>
      {userData.isSecurityQuestions &&
        <div className="container">
          <h2>Security Questions</h2>
          <p>You've successfully set up your security questions! There’s nothing more to do. You're all set and secure. 🥳</p>
        </div>
      }

      {!userData.isSecurityQuestions &&
        <div className="container">
          <h2>{`Security Qustions ${selectedQuestions.length}/3`}</h2>
          <p>{`${selectedQuestions.length < 3 ? "You need to select 3 questions" : "You're all done, don't forget to save!"}`}</p>
  
          {selectedQuestions.length < 3 &&
            <form onSubmit={addQuestion} className="select-security-question">
              <Dropdown2 
                options={securityQuestions}
                setOptions={setSecurityQuestions}
              />
  
              <Input 
                placeholder={"Your answer..."} 
                onChange={handleUserInput}
                value={userInput}
              />
              
              <Button 
                type={userInput.trim().length === 0 ? "invalid" : "valid"}
                text={"Select"}
              />
            </form>
          }
  
          {
            <ShowMore 
              text={"question"}
              items={selectedQuestions}
              show={showSelectedQuestions}
              setterFunction={handleShowSelectedQuestions}
            />
          }
  
          {showSelectedQuestions &&
            <div className="selected-questions_container">
              {
                selectedQuestions.map((question, i) => {
                  return (
                    <SecurityQuestion 
                      key={i}
                      question={question}
                      i={i}
                      removeSecurityQuestion={removeSecurityQuestion}
                      editSecurityQuestion={editSecurityQuestion}
                    />
                  )
                })
              }
            </div>
          }
  
          {
            selectedQuestions.length === 3 && 
            <Button text={"Save"} onClick={saveQuestions}/>
          }
        </div>
      }
    </>
  )
};

export default SecurityQuestions;