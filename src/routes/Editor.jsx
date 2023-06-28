import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Editor.module.css";
import { useSelector } from "react-redux";


export default function Editor() {
  const navigate = useNavigate();

  //입력 데이터들
  const [body, setBody] = useState();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [category, setCategory] = useState('카테고리없음');

  //user = firebase 유저 객체
  const user = useSelector((state) => state.auth.user);
  //유저 닉네임
  const nickname = useSelector((state) => state.auth.nickname);

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

  const posting = async (e) => {
    e.preventDefault();
    const writeDate = new Date().toLocaleString();
    const data = {
      title: title,
      date: date,
      body: body,
      writeDate: writeDate,
      writer: user,
      nickname : nickname,
      category: category,
    };

    await fetch("https://seed-foggy-apartment.glitch.me/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/post/${data.id}`);
      })
      .catch((error) => {
        console.error("게시글 작성 중 오류가 발생했습니다.", error);
      });
  };

  return (
    <form method="POST" onSubmit={posting}>
      <main className={classes.main}>
        <div className={classes.editorHead}>
          <select
            name="category"
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="카테고리없음">카테고리</option>
            <option value="문학">문학</option>
            <option value="인문">인문</option>
            <option value="사회과학">사회과학</option>
            <option value="자기계발">자기계발</option>
            <option value="기타">기타</option>
          </select>
          <label htmlFor="data">
            완독일
            <input
              type="date"
              name="date"
              className={classes.date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <input
            required
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            className={classes.titleInput}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={classes.editorContainer}>
          <ReactQuill
            modules={modules}
            placeholder="내용을 입력해주세요."
            theme="snow"
            style={{ height: "500px" }}
            onChange={(e) => setBody(e)}
            required={true}
          />
        </div>
      </main>
      <div className={classes.footer}>
        <button type="submit">작성완료</button>
        <button
          type="button"
          onClick={() => {
            navigate("..");
          }}
        >
          취소
        </button>
      </div>
    </form>
  );
}
