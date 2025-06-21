import "./OptionPicker.css";

function OptionPicker(props) {
  const { options, setUnit } = props;

  const selectOption = (option) => {
    setUnit((prevValues) => {
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
        options.map((option) => {
          return (
            <button onClick={() => selectOption(option.name)} className={`${option.active ? "active" : "not-active"}`} type={"button"} key={option.name}>
              {option.name}
            </button>
          )
        })
      }
    </div>
  )
};

export default OptionPicker;