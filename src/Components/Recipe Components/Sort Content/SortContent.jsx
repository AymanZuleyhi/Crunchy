import "./SortContent.css";
import { useState, useEffect } from "react";
import Dropdown2 from "../../Dropdown 2/Dropdown2.jsx";

function SortContent(props) {
  const { type, fetchContent } = props;

  const [sortingOptions, setSortingOptions] = useState([
    { name: "Newest", active: true },
    { name: "Oldest", active: false },
    { name: "Most popular", active: false },
    { name: "Least popular", active: false }
  ]);

  useEffect(() => {
    const sort = { questions: "" , reviews: "" };

    const activeSelection = sortingOptions.find((option) => option.active).name;

    if(type === "question") {
      sort.questions = activeSelection;
    } else {
      sort.reviews = activeSelection;
    };

    fetchContent(sort);
  }, [sortingOptions])

  return (
    <div className="SORT-CONTENT">
      <p>{`Sort ${type === "question" ? "questions" : "reviews"} by:`}</p>

      <Dropdown2 options={sortingOptions} setOptions={setSortingOptions}/>
    </div>
  )
};

export default SortContent;