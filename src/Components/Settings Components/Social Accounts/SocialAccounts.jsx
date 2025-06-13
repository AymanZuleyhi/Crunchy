import "./SocialAccounts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Input from "../../Input/Input.jsx";

const socials = [
  {name: "facebook", icon: faFacebook},
  {name: "instagram", icon: faInstagram},
  {name: "twitter", icon: faTwitter},
  {name: "youtube", icon: faYoutube}
];

function SocialAccounts(props) {
  const { userDataCopy, setUserDataCopy } = props;

  const handleSocials = (e, social) => {
    setUserDataCopy((prevUserData) => ({
      ...prevUserData,
      socialLinks: {...prevUserData.socialLinks, [social.name]: e.target.value}
    }));
  };

  return (
    <div className="container">
      <h2>My accounts 🫵</h2>
      <p>Share your social media icons with other users.</p>

      <div className="social-media_container">
        {
          socials.map((social) => {
            return (
              <div key={social.name}>

                <FontAwesomeIcon icon={social.icon}/>

                <Input
                  value={userDataCopy.socialLinks[social.name]} 
                  placeholder={social.name} 
                  onChange={(e) => handleSocials(e, social)}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default SocialAccounts;