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

      if(!data.success) {
        return;
      };

      if(data.success) {
        // console.log("The user is succesfully authenticated", data);
        setLogedIn(true);
        getUserData();
      } else {
        // console.log("The user is not authenticated", data);
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
      
      if(data.user) {
        // console.log("The user info we get from the back-end", data);
        setUserData(data.user);
        setLogedIn(true);
      } else {
        // console.log("We could not get the user data from the back-end.", data.message);
      }
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