import "./Reply.css";
import { useContext } from "react";
import { Helpers } from "../../../Context/Helpers";
import ProfilePicture from "../../Profile Picture/ProfilePicture";

function Reply(props) {
  const { author, text, createdAt, _id  } = props.reply;
  
  const { formatDate } = useContext(Helpers);

  return(
    <div key={_id} className="REPLY">
      <ProfilePicture userId={author.userId}/>
      
      <div className="reply_body">
        <div className="reply_headline">
            <p>{author.username}</p>
            <p>{formatDate(createdAt)}</p>
        </div>

        <p>{text}</p>
      </div>
    </div>
  )
};

export default Reply;