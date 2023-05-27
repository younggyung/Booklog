import { useLoaderData, useNavigate, Outlet } from "react-router-dom";
import classes from "./PostDetail.module.css";

function PostDetail() {
  const post = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
      <div className={classes.contents}>
        <div className={classes.title_area}>
          <h2>{post.title}</h2>
          <span>{post.date}</span>
        </div>
        <div className={classes.body_area}>
          <p
            dangerouslySetInnerHTML={{
              __html: post.body,
            }}/>

        </div>
        <p>
          <button
            onClick={(e) => {
              navigate("update");
            }}
          >
            수정
          </button>
          <button
            onClick={(e) => {
              fetch("http://localhost:3000/posts/" + post.id, {
                method: "DELETE",
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error");
                  }
                  navigate("..");
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            삭제
          </button>
        </p>
      </div>
    </>
  );
}

export default PostDetail;
export async function loader({ params }) {
  const response = await fetch("http://localhost:3000/posts/" + params.id);
  const resData = await response.json();
  return resData;
}
