import classes from "./Editor.module.css";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import ReactQuill from "react-quill";

function UpdatePost() {
  const originPost = useLoaderData();
  const [body, setBody] = useState();
  const navigate = useNavigate();

  const cancel = ()=>{
    navigate('..');
  }
  const modules = useMemo(() => ({
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ color: ["#000000", "#e60000"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5] }],
      [{ font: [] }],
      [{ align: [] }],
    ],
  }));

  return (
    <Form method="POST">
      <main className={classes.main}>
        <div className={classes.editorHead}>
          <select name="category" defaultValue={originPost.category}>
            <option value="">카테고리</option>
            <option value="문학">문학</option>
            <option value="인문">인문</option>
            <option value="사회과학">사회과학</option>
            <option value="자기계발">자기계발</option>
            <option value="자기계발">기타</option>
          </select>
          <label htmlFor="data">
            완독일
            <input
              type="date"
              name="date"
              className={classes.date}
              defaultValue={originPost.date}
            />
          </label>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            className={classes.titleInput}
            defaultValue={originPost.title}
          />
          <input type="hidden" name="body" value={body} />
        </div>
        <div className={classes.editorContainer}>
          <ReactQuill
            name="body"
            modules={modules}
            placeholder="내용을 입력해주세요."
            theme="snow"
            style={{ height: "500px" }}
            onChange={setBody}
            defaultValue={originPost.body}
          />
        </div>
      </main>
      <div className={classes.footer}>
        <button type="submit">작성완료</button>
        <button onClick={cancel}>취소</button>
      </div>
    </Form>
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
  window.location.href = "/post/" + params.id;
  return null;
}
