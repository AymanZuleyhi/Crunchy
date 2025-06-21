import "./Questions.css";
import { useState } from "react";
import ContentBox from "../../Content Box/ContentBox.jsx";
import ClickableText from "../../Clickable Text/ClickableText.jsx";
import ContentSubmissionBox from "../../Content Submission Box/ContentSubmissionBox.jsx";
import SortContent from "../Sort Content/SortContent.jsx";

function Questions(props) {
  const { type, fetchContent, data } = props;

  const [questionsToShow, setQuestionsToShow] = useState(3);
  
  const handleQuestionsToShow = (value) => {
    setQuestionsToShow(value === "increase" 
      ? questionsToShow + 3 
      : parseInt(`${questionsToShow <= 3 ? 3 : questionsToShow - 3}`)
    );
  };

  return(
    <div className="questions_container">
      <h2>{type === "question" ? "Questions" : "Reviews"}</h2>

      <ContentSubmissionBox type={type} fetchContent={fetchContent}/>

      {data.length !== 0 &&
        <>
          <SortContent type={type} fetchContent={fetchContent}/>

          <div className="all-questions">
            {
              data.map((question , i) => {
                if(i < questionsToShow) {
                  return (
                    <ContentBox 
                      key={question._id}
                      type={type}
                      content={question}
                      fetchContent={fetchContent}
                    />
                  )
                }
              })
            }
          </div>

          <p style={{ color: "grey" }}>{`Currently showing up to ${questionsToShow} ${type === "question" ? "questions" : "reviews"}.`}</p>
  
          <div className={`questions_controls ${questionsToShow >= data.length ? "maximum" : "not-maximum"}`}>
            {questionsToShow < data.length &&
              <ClickableText text={"Show more"} onClick={() => handleQuestionsToShow("increase")}/>
            }
            
            {questionsToShow > 3 &&
              <ClickableText text={"Show less"} onClick={() => handleQuestionsToShow("decrease")}/>
            }
          </div>
        </>
      }

      {data.length === 0 &&
        <p>{`There are currently no ${type === "qustion" ? "questions" : "reviews"} 😟`}</p>
      }

    </div>
  )
};

export default Questions;