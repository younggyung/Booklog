import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useRef, useMemo } from "react";
import { Form,redirect } from "react-router-dom";
import classes from "./Editor.module.css";

export default function Editor({}) {
  const quillRef = useRef();
  const [body, setBody] = useState();

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
          <select name="category" required>
            <option value="카테고리없음">카테고리</option>
            <option value="문학">문학</option>
            <option value="인문">인문</option>
            <option value="사회과학">사회과학</option>
            <option value="자기계발">자기계발</option>
            <option value="기타">기타</option>
          </select>
          <label htmlFor="data">
            완독일
            <input type="date" name="date" className={classes.date} required />
          </label>
          <input
            required
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            className={classes.titleInput}
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
            value={body}
            ref={quillRef}
            required={true}
          />
        </div>
      </main>
      <div className={classes.footer}>
        <button type="submit">작성완료</button>
        <button>취소</button>
      </div>
    </Form>
  );
}

export async function action({ request }) {
  const writeDate = new Date().toLocaleString();
  const formData = await request.formData();
  formData.append("writeDate", writeDate);
  const postData = Object.fromEntries(formData);
  fetch("https://seed-foggy-apartment.glitch.me/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect('/');
}
