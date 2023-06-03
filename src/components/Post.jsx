import classes from "./Post.module.css";
import { Link } from "react-router-dom";

function Post({ title, body, id }) {
  return (
    <li className={classes.post}>
      <Link to={"post/" + id}>
        <h2>{title}</h2>
        <p>{body}</p>
      </Link>
    </li>
  );
}

export default Post;
