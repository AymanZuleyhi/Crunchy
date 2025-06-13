import "./Settings.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import NavMenu from "../../Components/Nav Menu/NavMenu";
import General from "../../Components/Settings Components/General/General";
import PersonalInformation from "../../Components/Settings Components/Personal Information/PersonalInformation";
import Security from "../../Components/Settings Components/Security/Security";
import DeactivateAccount from "../../Components/Settings Components/Deactivate Account/DeactivateAccount";
import { AppContext } from "../../Context/AppContext";

function Settings() {
  const { backendUrl, userData, getUserData } = useContext(AppContext);

  const [menu, setMenu] = useState([
    {name: "Account", active: true},
    {name: "Personal information", active: false},
    {name: "Security", active: false},
    {name: "Deactivate account", active: false}
  ]); 

  const [userDataCopy, setUserDataCopy] = useState(userData);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if(userData) {
      setUserDataCopy(userData);
    }
  }, [userData])

  useEffect(() => {
    setIsValid(JSON.stringify(userData) !== JSON.stringify(userDataCopy));
  }, [userData, userDataCopy])

  useEffect(() => {
    setUserDataCopy(userData);
  }, [menu])

  const updateInformation = async () => {
    const url = `${backendUrl}/auth/change-info`;

    try{
      const { data } = await axios.post(url, 
        { userDataCopy },
        { withCredentials: true }
      );
  
      if(data.success) {
        window.scrollTo(0, 0);
        getUserData();
        toast(data.message);
      } else {
        toast.error(data.message);
      };
    } catch(error) {
      console.error(error.message);
      toast.error(data.message);
    }
  };

  if(userData === undefined || userDataCopy === undefined) {
    return <div></div>
  };

  return (
    <div className="SETTINGS">
      <h1>Settings</h1>

      <NavMenu 
        menu={menu} 
        setMenu={setMenu} 
        setUserDataCopy={setUserDataCopy}
      />

      {menu[0].active &&
        <General 
          userData={userData} 
          userDataCopy={userDataCopy} 
          setUserDataCopy={setUserDataCopy}
          isValid={isValid}
          updateInformation={updateInformation}
        />
      }

      {menu[1].active &&
        <PersonalInformation 
          userData={userData} 
          userDataCopy={userDataCopy} 
          setUserDataCopy={setUserDataCopy}
          isValid={isValid}
          updateInformation={updateInformation}  
        />
      }

      {menu[2].active &&
        <Security 
          userData={userData} 
          userDataCopy={userDataCopy} 
          setUserDataCopy={setUserDataCopy}
          isValid={isValid}
        />
      }

      {menu[3].active &&
        <DeactivateAccount />
      }
    </div>
  )
};

export default Settings;