import "./FormInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ShowHidePassword from "../Show Hide Password/ShowHidePassword.jsx";

function FormInput(props) {
  const { 
    text,
    name,
    type,
    value,
    placeholder,
    error,
    pattern,
    required,
    onChange
  } = props;

  const [inputType, setInputType] = useState(type);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };
  const changeInputType = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="INPUT">        
      <div className="input-headline">
        <p>{text}</p>

        {type === "password" &&
          <ShowHidePassword inputType={inputType} changeInputType={changeInputType} />
        }
      </div>              

      <input
        onChange={onChange}
        name={name} 
        type={inputType} 
        value={value} 
        placeholder={placeholder} 
        pattern={pattern} 
        required={required} 
        onBlur={handleFocus}
        focused={focused.toString()}
        onFocus={() => text === "Confirm password" && setFocused(true)}
      />

      <FontAwesomeIcon className="check-mark" icon={faCircleCheck}/>

      <p className="error_message">{error}</p>
    </div>
  )
};

export default FormInput;