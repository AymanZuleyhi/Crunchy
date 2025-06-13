import "./ShowMore.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function ShowMore(props) {
  const { text, items, show, setterFunction } = props;

  return (
    <>
      {items?.length !== 0 &&
        <div className="SHOW_MORE" onClick={setterFunction}>
          <p>{`
              ${show ? "Hide" : "Show"} 
              ${items?.length > 0 ? items?.length : ""}
              ${items?.length > 1 ? `${text}s` : text}
            `}</p>
          <FontAwesomeIcon icon={ items?.length > 0 && show ? faChevronUp : faChevronDown } />
        </div>
      }
    </>
  )
};

export default ShowMore;