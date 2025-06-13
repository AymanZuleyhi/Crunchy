import "./Rating.css";
import assets from "../../../assets/assets";

function Rating(props) {
  const { rating } = props;
  
  const total = rating.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  
  const displayRating = rating.length === 0 ? "" : `(${total / rating.length})`;

  return (
    <div className="RATING">
      <p>{`${rating.length} reviews ${displayRating}`}</p>

      <div className="rating">
        <img src={assets.rating}/>
        <div style={{ width: `${total * 2 / rating.length}0%` }}></div>
        <div className="second-div"></div>
      </div>
    </div>
  )
};

export default Rating;