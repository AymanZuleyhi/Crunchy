import "./Textarea.css";

function Textarea(props) {
  const { userInput, onChange } = props;

  return (
    <div className="TEXTAREA">
      <textarea
        value={userInput}
        onChange={onChange}
        maxLength={"250"} 
        placeholder={"I like unicorns..."}
      />

      <p>{`${!userInput ? "0" : userInput?.length}/250`}</p>
    </div>
  )
};

export default Textarea;