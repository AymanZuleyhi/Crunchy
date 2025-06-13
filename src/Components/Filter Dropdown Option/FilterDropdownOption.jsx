import "./FilterDropdownOption.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

function FilterDropdownOption(props) {
  const { name, option, onClick, selectedOptions } = props;

  return (
    <div onClick={() => onClick(option)} className="FILTER-DROPDOWN-OPTION">
      <p>{option}</p>
      <FontAwesomeIcon icon={selectedOptions[name]?.includes(option) ? faSquareCheck : faSquare} />
    </div>
  )
};

export default FilterDropdownOption;