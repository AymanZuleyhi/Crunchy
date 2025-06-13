import "./ContentBoxHeadline.css";
import { useContext } from "react";
import { Helpers } from "../../../Context/Helpers.jsx";
import ProfilePicture from "../../Profile Picture/ProfilePicture.jsx";
import ShowRating from "../../Recipe Components/Show Rating/ShowRating.jsx";
import ContentBoxControls from "../Content Box Controls/ContentBoxControls.jsx";

function ContentBoxHeadline(props) {
  const { type } = props;
  const { author, createdAt, rating, _id } = props.content;

  const { formatDate } = useContext(Helpers);

  return (
    <div className="CONTENT-BOX_HEADLINE">
      <div className="content-box_author">
        <ProfilePicture userId={author.userId}/>

        <div className="content-box_headline">
          {type === "review" &&
            <ShowRating rating={rating}/>
          }

          <div className={`content-box_name-date ${type}`}>
            <p>{author.username}</p>
            <p>{formatDate(createdAt)}</p>
          </div>
        </div>
      </div>

      {type === "post" &&
        <ContentBoxControls contentId={_id}/>
      }
    </div>
  )
};

export default ContentBoxHeadline;