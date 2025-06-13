import "./LoadingSpinner.css";
import { useContext } from "react";
import { Helpers } from "../../Context/Helpers.jsx";
import assets from "../../assets/assets.js";

function LoadingSpinner() {
  const { showSpinner } = useContext(Helpers);

  return (
    <>
      {showSpinner &&
        <div className="LOADING-SPINNER">
          <img src={assets.lemon}/>
        </div>
      }
    </>
  )
};

export default LoadingSpinner;