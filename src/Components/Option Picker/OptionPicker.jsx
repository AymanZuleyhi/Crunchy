import "./OptionPicker.css";

function OptionPicker(props) {
  const { options, setOptions } = props;

  const selectOption = (optionName) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option) => {
        return option.name === optionName
        ? { ...option, active: true }
        : { ...option, active: false }
      })
    })
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