import classes from "./NewPost.module.css";
import Modal from "../components/Modal";
import {
  Link,
  useRouteLoaderData,
  Form,
} from "react-router-dom";

function UpdatePost() {
  const originPost = useRouteLoaderData("post");

  return (
    <>
      <Modal>
        <Form method="POST" className={classes.form}>
          <p>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={originPost.title}
            />
          </p>
          <p>
            <label htmlFor="body">내용</label>
            <textarea
              rows={10}
              id="body"
              name="body"
              defaultValue={originPost.body}
            ></textarea>
          </p>
          <p>
            <label htmlFor="date">완독</label>
            <input type="date" id="date" name="date" defaultValue={originPost.date} />
          </p>
          <p className={classes.buttons}>
            <button type="submit">작성</button>
            <Link to=".." type="button">
              취소
            </Link>
          </p>
        </Form>
      </Modal>
    </>
  );
}

export default UpdatePost;
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  fetch("http://localhost:3000/posts/" + params.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  window.location.href='/post/'+params.id
  return null;
}
