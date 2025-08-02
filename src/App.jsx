import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import NavBar from "./Components/Nav bar/NavBar.jsx";
import Home from "./Pages/Home/Home.jsx";
import Account from "../src/Pages/Account/Account.jsx";
import Settings from "../src/Pages/Settings/Settings.jsx";
import AddRecipe from "../src/Pages/Add recipe/AddRecipe.jsx";
import Recipe from "../src/Pages/Recipe/Recipe.jsx";
import NewsFeed from "../src/Pages/News feed/NewsFeed.jsx";
import Login from "./Pages/Login/Login.jsx";
import SignUp from "./Pages/Sign up/SignUp.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import BlackScreen from "./Components/Black Screen/BlackScreen.jsx";
import VerifyOTP from "./Pages/Verify OTP/VerifyOTP.jsx";
import ChangePassword from "./Components/Change Password/ChagePassword.jsx";
import TwoFactorAuthentication from "./Components/Two Factor Authentication/TwoFactorAuthentication.jsx";
import ConfirmPassword from "./Components/Confirm Password/ConfirmPassword.jsx";
import ConfirmEmail from "./Components/Confirm Email/ConfirmEmail.jsx";
import CheckSecurityQuestions from "./Components/Check Security Questions/CheckSecurityQuestions.jsx";
import SetNewPassword from "./Components/Set New Password/SetNewPassword.jsx";
import LoadingSpinner from "./Components/Loading Spinner/LoadingSpinner.jsx";
import ServerLoading from "./Components/Server Loading/ServerLoading.jsx";
import { Helpers } from "./Context/Helpers.jsx";

function App() {
  const location = useLocation().pathname;

  const { serverLoading } = useContext(Helpers);
  
  return (
    <div className={`BODY ${location === "/" ? "home" : "notHome" }`}>
      {serverLoading && 
        <ServerLoading />
      }
      
      <LoadingSpinner />
      <NavBar />
      <BlackScreen />

      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:id" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/news-feed" element={<NewsFeed />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/confirm-information" element={<ConfirmPassword />} />

        <Route path="/verify" element={<VerifyOTP />} />
        
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/two-factor-authentication" element={<TwoFactorAuthentication />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/check-security-questions" element={<CheckSecurityQuestions />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
      </Routes>

      {
        // Don't show the footer if we're on the login or sign-up page.
        (!["/login", "/sign-up", "/verify"].includes(location)) &&
        <Footer />
      }
    </div>
  )
};

export default App;
