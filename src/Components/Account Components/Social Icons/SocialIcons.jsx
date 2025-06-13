import "./SocialIcons.css";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Button2 from "../../Button 2/Button2.jsx";

function SocialIcons(props) {
  const { socialLinks } = props

  const generateIcon = (name) => {
    switch(name) {
      case "facebook": {
        return faFacebook;
      }
      case "instagram": {
        return faInstagram;
      }
      case "twitter": {
        return faTwitter;
      }
      case "youtube": {
        return faYoutube
      }
    }
  };

  const handleClick = (url) => {
    window.open(url);
  };

  return (
    <div className="SOCIAL-ICONS">
      {
        Object.entries(socialLinks).map(([name, url]) => {
          return (
            <Button2 
              key={name} 
              text={name} 
              icon={generateIcon(name)}
              onClick={() => handleClick(url)}  
            />
          )
        })
      }
    </div>
  )
};

export default SocialIcons;