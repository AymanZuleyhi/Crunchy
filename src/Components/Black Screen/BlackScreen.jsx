import "./BlackScreen.css";
import { useContext } from "react";
import { Helpers } from "../../Context/Helpers.jsx";

function BlackScreen() {
  const { showBlackScreen } = useContext(Helpers);

  return (
    <>
      {showBlackScreen &&
        <div className="BLACK-SCREEN"></div>
      }
    </>
  )
};

export default BlackScreen;