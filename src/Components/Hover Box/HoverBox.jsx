import "./HoverBox.css";

function HoverBox(props) {
  const { text } = props;

  return(
    <div className="HOVER-BOX">
      <p>{text}</p>
    </div>
  )
};

export default HoverBox;