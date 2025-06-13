import "./Input2.css";

function Input2(props) {
  const { userInput, placeholder, onChange } = props;

  return(
    <input 
      className="INPUT2"
      value={userInput}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
};

export default Input2;