import "./OptionPicker.css";
import { useState } from "react";

function OptionPicker(props) {
  const { options, setUnit } = props;

  const [values, setValues] = useState(options);

  const selectOption = (option) => {
    setUnit(option);
    
    setValues((prevValues) => {
      return prevValues.map((eachOption) => {
        return eachOption.name === option
        ? {...eachOption, active: true}
        : {...eachOption, active: false}
      });
    });
  };

  return(
    <div className="OPTION_PICKER">
      {
        values.map((option) => {
          return (
            <button onClick={() => selectOption(option.name)} className={`${option.active ? "active" : "not-active"}`} key={option.name}>
              {option.name}
            </button>
          )
        })
      }
    </div>
  )
};

export default OptionPicker;