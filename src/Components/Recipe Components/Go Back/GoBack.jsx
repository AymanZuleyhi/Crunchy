import "./GoBack.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import HoverBox from "../../Hover Box/HoverBox.jsx";

function GoBack() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div className="GO-BACK" onClick={() => handleNavigate()}>
      <FontAwesomeIcon icon={faArrowLeft}/>
      <HoverBox text={"Go Back"}/>
      <p>Back</p>
    </div>
  )
};

export default GoBack;