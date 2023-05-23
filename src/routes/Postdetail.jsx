import { useLoaderData } from "react-router-dom";
import classes from "./PostDetail.module.css";
function PostDetail() {
  const post = useLoaderData();
  return (
    <div className={classes.contents}>
      <div className={classes.title_area}>
        <h2>{post.title}</h2>
        <span>{post.date}</span>
      </div>
      <div className={classes.body_area}>
        <p>{post.body}</p>
      </div>
      <p>
        <button>수정</button>
        <button>삭제</button>
      </p>
    </div>
  );
}

export default PostDetail;
export async function loader({ params }) {
  const response = await fetch("http://localhost:3000/posts/" + params.id);
  const resData = await response.json();
  return resData;
}
