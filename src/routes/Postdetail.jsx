import { useLoaderData, useNavigate } from "react-router-dom";
import classes from "./Postdetail.module.css";
import DOMPurify from "isomorphic-dompurify";
import { useSelector } from "react-redux";

function PostDetail() {
  const post = useLoaderData();
  const navigate = useNavigate();
  //옵셔널 체이닝으로 user 값을 먼저 받아온 다음에 uid를 읽을 수 있게
  const user = useSelector((state) => state.auth.user)?.uid


  return (
    <>
      <div className={classes.contents}>
        <div className={classes.title_area}>
          <h2>{post.title}</h2>
          <p>{"읽은 날 " + post.date}</p>
          <span>{post.nickname}</span>
        </div>
        <div className={classes.body_area}>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.body),
            }}
          />
        </div>
        <p>
        {user === post.writer.uid &&
        <>
          <button
            className={classes.buttons}
            onClick={(e) => {
              navigate("update");
            }}
          >
            수정
          </button>
          <button
            className={classes.buttons}
            onClick={() => {
              const confirmDelete = confirm("삭제하시겠습니까?");
              if (confirmDelete) {
                fetch(
                  "https://seed-foggy-apartment.glitch.me/posts/" + post.id,
                  {
                    method: "DELETE",
                  }
                )
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Error");
                    }
                    navigate("..");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            }}
          >
            삭제
          </button>
          </>}
        
          <button
            className={classes.buttons}
            onClick={() => {
              navigate("/");
            }}
          >
            목록
          </button>
        </p>
      </div>
    </>
  );
}
export default PostDetail;
export async function loader({ params }) {
  const response = await fetch(
    "https://seed-foggy-apartment.glitch.me/posts/" + params.id
  );
  const resData = await response.json();
  return resData;
}
