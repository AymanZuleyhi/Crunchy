import "./ServerLoading.css";
import { useContext, useEffect } from "react";
import { Helpers } from "../../Context/Helpers";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button2 from "../Button 2/Button2";

function ServerLoading() {
  const { setServerLoading } = useContext(Helpers);

  const handleClosePopUp = () => {
    setServerLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setServerLoading(false);
    }, 5000)

    return () => clearTimeout(timeout);
  }, [])

  return (
    <div className="SERVER-LOADING">
      <p>It might take the server up to 30 seconds to load, since I'm using a free Render plan. Please be patient. 😊</p>
      <Button2 onClick={handleClosePopUp} icon={faX} text={"Close"}/>
    </div>
  )
};

export default ServerLoading;