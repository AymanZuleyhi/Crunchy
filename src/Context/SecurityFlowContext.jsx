import { createContext, useState } from "react";

export const SecurityFlowContext = createContext();

function SecurityFlowContextProvider({ children }) {
  const [isText, setIsText] = useState(null);
  const [flowType, setFlowType] = useState(null);
  const [email, setEmail] = useState(null);

  const value = {
    isText, setIsText,
    flowType, setFlowType,
    email, setEmail
  };
  
  return (
    <SecurityFlowContext.Provider value={value}>
      { children }
    </SecurityFlowContext.Provider>
  )
};

export default SecurityFlowContextProvider;