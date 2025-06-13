import "./SubmitRating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function SubmitRating(props) {
  const { rating, setRating } = props;

  const [stars, setStars] = useState([
    {id: 1, active: false},
    {id: 2, active: false},
    {id: 3, active: false},
    {id: 4, active: false},
    {id: 5, active: false}
  ]);

  const handleClick = (id) => {
    setStars((prevRating) => {
      return prevRating.map((star) => {
        return star.id <= id.id
        ? {...star, active: true}
        : {...star, active: false}
      });
    });

    setRating(id.id);
  };

  return(
    <div className="SUBMIT-RATING">
      <p>{`Your rating is ${rating ? `${rating}.0` : "..."}`}</p>

      <div>
        {
          stars.map((star) => {
            return (
              <FontAwesomeIcon 
                key={star.id} 
                icon={faStar}
                onClick={() => handleClick(star)}
                className={`${star.active ? "active" : "not-active"}`} 
              />
            )
          })
        }
      </div>
    </div>
  )
};

export default SubmitRating;