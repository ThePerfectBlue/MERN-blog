import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, avatar, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={avatar} alt="Board" />
        </Link>
      </div>

      <div className="text">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="" className="author">
            <b>
              <i>{author.username}</i>
            </b>
          </a>
          <time dateTime="">
            {format(new Date(createdAt), "dd MMM yyyy p")}
          </time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
