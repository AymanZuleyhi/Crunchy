import "./Logo.css";
import assets from "../../assets/assets.js";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="LOGO">
        <img src={assets.logo}/>
        <p>CRUNCHY</p>
      </div>
    </Link>
  )
}

export default Logo;