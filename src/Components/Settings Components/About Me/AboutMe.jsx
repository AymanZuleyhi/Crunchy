import "./AboutMe.css";
import Input from "../../Input/Input.jsx";
import Textarea from "../../Textarea/Textarea.jsx";

function AboutMe(props) {
  const { userDataCopy, setUserDataCopy } = props;

  const handleInputChange = (e) => {
    setUserDataCopy((prevUserData) => ({
      ...prevUserData,
      name: e.target.value 
    }));
  };

  const handleBioChange = (e) => {
    setUserDataCopy((prevUserData) => ({
      ...prevUserData,
      bio: e.target.value
    }));
  };

  return (
    <div className="container">
      <h2>About me 😁</h2>

      <p>This is your name in Crunchy.</p>

      <Input 
        type={"text"} 
        value={userDataCopy?.name} 
        onChange={handleInputChange}
      />

      <p>Share a little bit about yourself, tell is what you love, what keeps you up at night.</p>
      
      <Textarea 
        input={userDataCopy?.bio} 
        onChange={handleBioChange}
      />
    </div>
  )
};

export default AboutMe;