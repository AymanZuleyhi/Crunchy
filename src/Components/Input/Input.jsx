import "./Input.css";

function Input(props) {
  const { placeholder, value, onChange, name, type, ref, pattern, required } = props;

  return (
    <input
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      type={type}
      ref={ref}
      pattern={pattern}
      required={required}
    />
  )
};

export default Input;