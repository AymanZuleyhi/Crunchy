import { useState, useEffect, createContext } from "react";

export const Helpers = createContext(null);

function HelpersProviders({ children }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);

  const handleClickOutside = (e, ref, setIsActive) => {
    if(ref.current === null) {
      return;
    }
    
    if(!ref.current.contains(e.target)) {
      console.log("hi");
      setIsActive(false);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date); // ← this is the fix

    const formattedDate = d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return formattedDate;
  };

  // Handle screen resize.
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const value = {
    screenWidth,
    showBlackScreen, setShowBlackScreen,
    showSpinner, setShowSpinner,
    handleClickOutside,
    formatDate
  };

  return (
    <Helpers.Provider value={value}>
      {children}
    </Helpers.Provider>
  )
};

export default HelpersProviders;