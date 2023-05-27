import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useRef, memo } from "react";
import { Form } from "react-router-dom";

export default function Editor({}) {
  const [body, setBody] = useState();

  const modules = {
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
  };

  return (
    <Form method="POST">
      <p>
        <label htmlFor="title">제목</label>
        <input type="text" name="title" />
      </p>
      <div style={{ height: "650px" }}>
        <label htmlFor="body">내용</label>
        <ReactQuill
          modules={modules}
          placeholder="내용을 입력해주세요."
          theme="snow"
          style={{ height: "500px" }}
          onChange={setBody}
        />
        <input type="hidden" name='body' value={body} />
      </div>
      <label htmlFor="date">완독</label>
      <input type="date" name="date" />
      <button>취소</button>
      <button type="submit">완료</button>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect("/");
}
