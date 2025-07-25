import "./CheckSecurityQuestions.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { SecurityFlowContext } from "../../Context/SecurityFlowContext.jsx";
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";

function CheckSecurityQuestions() {
  const { backendUrl } = useContext(AppContext);
  const { flowType, email } = useContext(SecurityFlowContext);

  const [securityQuestions, setSecurityQuestions] = useState();
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const getSecurityQuestions = async () => {
    const url = `${backendUrl}/auth/get-security-questions`;

    try {
      const { data } = await axios.post(url, 
        { email }
      );

      const questions = data.questions.map((question) => {
        return {question: question.question, answer: ""}
      });

      setSecurityQuestions(questions);
    } catch(error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSecurityQuestions();
  }, [])

  useEffect(() => {
    const checkValidity = securityQuestions?.some((question) => question.answer.trim().length === 0);

    setIsValid(!checkValidity);
  }, [securityQuestions])
  
  const resetAnswers = () => {
    setSecurityQuestions((prevQuestions) => {
      return prevQuestions.map((q) => ({ question: q.question, answer: "" }));
    });
  };

  const handleCheckAnswer = async (e) => {
    e.preventDefault();

    const url = `${backendUrl}/auth/check-security-questions`

    try {
      const { data } = await axios.post(url, 
        { email, securityQuestions }
      );

      if(data.success) {
        toast(data.message);
        navigate(`/set-new-password`);
      } else {
        resetAnswers()
        toast.error(data.message);
      };
    } catch(error) {
      console.error(error.message);
    };
  };

  const onChange = (e, question) => {
    setSecurityQuestions((prevQuestions) => {
      return prevQuestions.map((eachQuestion) => {
        return eachQuestion.question === question.question
        ? { ...eachQuestion, answer: e.target.value }
        : eachQuestion
      });
    });
  };

  return (
    <div className="SECURITY-QUESTIONS">
      <h1>Security Check 🔒</h1>
      <p>To make sure it's really you, we need you to answer a few security questions. These were set up when you created your account. Once you answer them correctly, you'll be able to reset your password.</p>
    
      <form onSubmit={handleCheckAnswer}>
        {
          securityQuestions?.map((question, i) => {
            return (
              <div key={i}>
                <p>{question.question}</p>

                <Input 
                  value={question.answer}
                  onChange={(e) => onChange(e, question)} 
                  placeholder={"Your answer..."} 
                />
              </div>
            )
          })
        }
        
        <Button isValid={isValid} text={"Check"}/>
      </form>
    </div>
  )
};

export default CheckSecurityQuestions;