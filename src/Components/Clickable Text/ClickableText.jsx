import "./ClickableText.css";

function RemoveEverything(props) {
  const {text, onClick} = props;

  return (
    <p className="CLICKABLE-TEXT" onClick={onClick}>{text}</p>
  )
};

export default RemoveEverything;