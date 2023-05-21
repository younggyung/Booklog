import classes from "./NewPost.module.css";
import { useState } from "react";
import Modal from "./Modal";

function NewPost({ closePosting, savePost }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredBody, setEnteredBody] = useState("");


  function titleChangerHandler(event) {
    setEnteredTitle(event.target.value);
  }

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      title: enteredTitle,
      body: enteredBody,
    };
    savePost(postData);
    closePosting();
  }

  return (
    <Modal cancel={closePosting}>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="title">제목</label>
          <input type="text" id="title" onChange={titleChangerHandler}></input>
        </p>
        <p>
          <label htmlFor="body">내용</label>
          <textarea rows={10} id="body" onChange={bodyChangeHandler}></textarea>
        </p>
        <p className={classes.buttons}>
          <button>작성</button>
          <button onClick={closePosting}>취소</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;
