import "./UserProfile.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { Helpers } from "../../Context/Helpers.jsx";
import ProfilePicture from "../Profile Picture/ProfilePicture.jsx";
import { SecurityFlowContext } from "../../Context/SecurityFlowContext.jsx";

const menu = [
  {name: "Account", url: "/account"},
  {name: "Settings", url: "/settings"},
  {name: "Logout", url: ""}
];

function UserProfile() {
  const { backendUrl, setLogedIn, userData } = useContext(AppContext);
  const { handleClickOutside } = useContext(Helpers);
  const { setEmail, setFlowType } = useContext(SecurityFlowContext);

  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const handleIsActive = () => {
    setIsActive(!isActive);
  };

  const logoutUser = async () => {
    const { data } = await axios.post(`${backendUrl}/auth/logout`, {}, {
      withCredentials: true,
      credentials: "include"
    });

    if(data.success) {
      navigate("/");
      setLogedIn(false);
      toast(data.message);
    } else {
      toast.error(data.message);
    };
  };

  const handleClick = (item) => {
    console.log(userData);
    if(userData) {
      if(item.name === "Logout") {
        logoutUser();
        return;
      } else {
        // If it's not the logout button.
        if(userData?.isVerified) {
          navigate(item.name === "Account" ? `${item.url}/${userData._id}` : item.url );
          handleIsActive(false);
          window.scrollTo(0, 0);
        } else {
          setFlowType("confirm-account");
          navigate("/verify");
          window.scrollTo(0, 0);
          setEmail(userData?.email);
        };
      };
    }
  };

  useEffect(() => {
    const clickHandler = (e) => handleClickOutside(e, dropdownRef, setIsActive);

    document.addEventListener("click", clickHandler);
    
    return () => {
      removeEventListener("click", clickHandler);
    };
  }, [])

  return(
    <div ref={dropdownRef} className="USER_PROFILE">
      <ProfilePicture isActive={isActive} onClick={handleIsActive}/>

      {isActive &&
        <div className="account-dropdown">
          {
            menu.map((item) => {
              return (
                <div onClick={() => handleClick(item)} key={item.name}>
                  <p>{item.name}</p>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
};

export default UserProfile;