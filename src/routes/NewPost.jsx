import classes from "./NewPost.module.css";
import Modal from "../components/Modal";
import { Link, redirect,Form } from 'react-router-dom';
import Editor from './Editor';

function NewPost() {

  return (
    <>
      <Modal>
        <Editor/>
        {/* <Form method='POST' className={classes.form} >
          <p>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
            ></input>
          </p>
          <p>
            <label htmlFor="body">내용</label>
            <textarea
              rows={10}
              id="body"
              name="body"
            ></textarea>
          </p>
          <p>
            <label htmlFor='date'>완독</label>
            <input type='date'
            id='date'
            name='date'/>
          </p>
          <p className={classes.buttons}>
            <button>작성</button>
            <Link to='..' type="button" >취소</Link>
          </p>
        </Form> */}
      </Modal>
    </>
  );
}

export default NewPost;
export async function action({request}){
const formData = await request.formData();
const postData = Object.fromEntries(formData);
fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  return redirect('/');
}
