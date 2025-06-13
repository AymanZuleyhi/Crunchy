import "./SearchBarFilter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function SearchBarFilter(props) {
  const { filter, removeFilter } = props;

  return (
    <div key={filter} className="SEARCH-BAR_FILTER">
      <p>{filter}</p>
      <button onClick={() => removeFilter(filter)} className="remove-filter" >
        <FontAwesomeIcon icon={faX}/>
      </button>
    </div>
  )
};

export default SearchBarFilter;