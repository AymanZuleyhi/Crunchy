import "./ShowRating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const length = [1, 2, 3, 4, 5];

function ShowRating(props) {
  const { rating } = props;

  return(
    <div className="RATING">
      <div>
        {
          length.map((id) => {
            return (
              <FontAwesomeIcon key={id} className={`STAR ${id <= rating ? "yellow" : "grey"}`} icon={faStar}/>
            )
          })
        }
      </div>
      <p>{`${rating}.0`}</p>
    </div>
  )
};

export default ShowRating;