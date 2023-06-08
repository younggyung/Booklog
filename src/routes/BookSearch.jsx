import { useState } from "react";
import classes from "./BookSearch.module.css";
import BookContents from "../components/BookContents";
import Modal from "../components/Modal";

function BookSearch({ closeModal }) {
  const [data, setData] = useState([]);
  const [result , setResult] =useState(true);

  async function getBookInfo(e) {
    e.preventDefault();
    const keyword = document.getElementById("keyword").value;
    var client_id = "25TA5VMG3g5PmlQtXotf";
    var client_secret = "JAuax3gT0H";
    const response = await fetch("/v1/search/book.json?query=" + keyword, {
      method: "GET",
      headers: {
        "Content-Type": "application.json",
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    });
    const resData = await response.json();
    if(resData.items.length > 0 ){
      setData(resData.items);
      setResult(true);
    }else if(resData.items.length <= 0){
      setData(resData.items)
      setResult(false);
    };
  }

    return (
      <Modal closeModal={closeModal}>
        <div className={classes.wrapper}>
          <div className={classes.form}>
            <form onSubmit={getBookInfo}>
              <p>책 정보 찾기 🧐</p>
              <input
                placeholder="제목 또는 저자명 입력"
                type="text"
                name="keyword"
                id="keyword"
                required
                className={classes.input}
              />
              <button className={classes.button}>검색</button>
            </form>
          </div>
          <div className={classes.result}>
            <ul>
              {data.length>0 && data.map((book) => (
                <BookContents
                  key={Math.random()}
                  title={book.title}
                  author={book.author}
                  description={book.description}
                  image={book.image}
                />
              ))} 
              {!result && "검색결과가 없습니다"}
            </ul>
          </div>
        </div>
      </Modal>
    );
  }

export default BookSearch;
