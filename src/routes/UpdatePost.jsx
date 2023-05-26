import classes from "./NewPost.module.css";
import Modal from "../components/Modal";
import { Link, useNavigate , useRouteLoaderData, redirect} from "react-router-dom";
import { useState } from "react";

function UpdatePost() {
  const originPost = useRouteLoaderData("post");
  const [post, setPost] = useState(originPost);
  const navigate = useNavigate();


  function onSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/posts/"+post.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify(post)
    });
    window.location.href='/post/'+post.id
  }


  return (
    <>
      <Modal>
        <form method="POST" className={classes.form}>
          <p>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={(e) => {
                setPost({ ...post, title: e.target.value });
              }}
            />
          </p>
          <p>
            <label htmlFor="body">내용</label>
            <textarea
              rows={10}
              id="body"
              name="body"
              value={post.body}
              onChange={(e) => {
                setPost({ ...post, body: e.target.value });
              }}
            ></textarea>
          </p>
          <p>
            <label htmlFor="date">완독</label>
            <input
              type="date"
              id="date"
              name="date"
              value={post.date}
              onChange={(e) => {
                setPost({ ...post, date: e.target.value });
              }}
            />
          </p>
          <p className={classes.buttons}>
            <button onClick={onSubmit}>작성</button>
            <Link to=".." type="button">
              취소
            </Link>
          </p>
        </form>
      </Modal>
    </>
  );
}

export default UpdatePost;
