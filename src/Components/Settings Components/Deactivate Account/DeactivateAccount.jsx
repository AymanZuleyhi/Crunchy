import Button from "../../Button/Button";
import "./DeactivateAccount.css";
import { useState, useContext } from "react";
import { Helpers } from "../../../Context/Helpers.jsx";
import DeleteAccount from "../Delete Account/DeleteAccount.jsx";

function DeactivateAccount() {
  const { setShowBlackScreen } = useContext(Helpers);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const handleShowDeleteAccount = () => {
    setShowDeleteAccount(!showDeleteAccount);
    setShowBlackScreen(showDeleteAccount ? false : true);
  };

  return(
    <div className="container">
      {showDeleteAccount &&
        <DeleteAccount handleShowDeleteAccount={handleShowDeleteAccount}/>
      }
      
      <h2>Delete Account ⛔</h2>
      <p>If you no longer wish to use Crunchy, you can permenantly delete your account.</p>
      <Button 
        onClick={() => handleShowDeleteAccount()} 
        text={"Delete My Account"} 
        err={true}
      />
    </div>
  )
};

export default DeactivateAccount;