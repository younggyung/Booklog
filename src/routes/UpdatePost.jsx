import classes from "./Editor.module.css";
import { Form,redirect,useLoaderData, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import ReactQuill from "react-quill";

function UpdatePost() {
  const originPost = useLoaderData();
  const navigate = useNavigate();
  const [data,setData] = useState(originPost);
  console.log(data)


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


  const titleHandler=(e)=>{
    const title = e.target.value;
    setData({...data, title:title});
  }

  const dateHandler=(e)=>{
    const date = e.target.value;
    setData({...data,date:date});
  }

  const categoryHandler =(e)=>{
    const category = e.target.value;
    setData({...data,category:category});
  }

  const bodyHandler =(e)=>{
    const body = e;
    setData({...data,body:body});
  }


    function submitHandler(e) {
    e.preventDefault();
    fetch("http://localhost:3000/posts/" + data.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    window.location.href = "/post/" + data.id;
  }



  return (
    <form method="PUT" onSubmit={submitHandler}>
      <main className={classes.main}>
        <div className={classes.editorHead}>
          <select name="category" defaultValue={originPost.category}  onChange={categoryHandler}>
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
              onChange={dateHandler}
            />
          </label>
          <input
            type="text"
            name="title"
            className={classes.titleInput}
            defaultValue={originPost.title}
            onChange={titleHandler}
          />
          {/* <input type="hidden" name="body" value={body} /> */}
        </div>
        <div className={classes.editorContainer}>
          <ReactQuill
            name="body"
            modules={modules}
            placeholder="내용을 입력해주세요."
            theme="snow"
            style={{ height: "500px" }}
            onChange={bodyHandler}
            defaultValue={originPost.body}
          />
        </div>
      </main>
      <div className={classes.footer}>
        <button type="submit">작성완료</button>
        <button onClick={cancel}>취소</button>
      </div>
    </form>
  );
}

export default UpdatePost;
// export async function action({ request, params }) {
//   const formData = await request.formData();
//   formData.append('body',body)
//   const updates = Object.fromEntries(formData);
  
//   fetch("http://localhost:3000/posts/" + params.id, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updates),
//   });
//   window.location.href = "/post/" + params.id;
//   return null;
// }
