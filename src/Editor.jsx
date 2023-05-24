import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, Form, redirect } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Editor({ onCancel, onAddPost }) {
  const [enteredData, setEnteredData] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhostL3000/posts");
      const resData = await response.json();
      setPosts(resData);
    }
    fetchData();
  }, []);

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
    <>
      <div style={{ height: "700px" }}>
        <ReactQuill
          modules={modules}
          placeholder="내용을 입력해주세요."
          onChange={(value) => setEnteredData(value)}
          theme="snow"
          style={{ height: "650px" }}
        />
      </div>
      <button>취소</button>
      <button>완료</button>
      <Post />
    </>
  );
}
