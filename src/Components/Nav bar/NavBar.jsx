import "./NavBar.css";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { useLocation, Link } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import Button from "../Button/Button.jsx";
import AccountLogedIn from "../Account Loged In/AccountLogedIn.jsx";

function NavBar() {
  const { logedIn } = useContext(AppContext);
  
  const location = useLocation().pathname;

  return (
    <div className={`NAV_BAR ${location === "/" ? "home" : `notHome ${["/login", "/sign-up", "/verify"].includes(location) ? "hide" : "show"}`}`}>
      <div className="nav-bar_container">
        <Logo />
        
        <div className={`nb_controls ${location === "/login" || location === "/sign-up" ? "hide" : "show"}`}>
          {!logedIn &&
            <>
              <Link to={"/login"}>
                <p>Login</p>
              </Link>
                
              <Link to={"/sign-up"}>
                <Button text={"Sign up"}/>
              </Link>
            </>
          }

          {logedIn &&
            <AccountLogedIn />
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar;