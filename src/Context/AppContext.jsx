import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect, createContext } from "react";

export const AppContext = createContext(null);

function AppContextProvider({ children }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [logedIn, setLogedIn] = useState(false);
  const [userData, setUserData] = useState();

  const handleCheckAuth = async () => {
    try{
      const { data } = await axios.get(`${backendUrl}/auth/is-authenticated`, {
        withCredentials: true
      });

      if(data.success) {
        setLogedIn(true);
        getUserData();
      } else {
        setLogedIn(false);
      }
    } catch(error) {
      toast.error(data.message);
    }
  };

  const getUserData = async () => {
    const url = `${backendUrl}/user/data`;

    try{
      const { data } = await axios.get(url, {
        withCredentials: true
      });

      console.log(data.user);
      setUserData(data.user);
    } catch (error) {
      setLogedIn(false);
      toast.error(data.message);
    };
  };

  useEffect(() => {
    handleCheckAuth();
  }, [])
  
  const value = {
    backendUrl,
    logedIn, setLogedIn,
    userData, setUserData,
    getUserData,
    handleCheckAuth
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
};

export default AppContextProvider;