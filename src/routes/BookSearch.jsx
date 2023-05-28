import { useEffect, useState } from "react";
import classes from "./BookSearch.module.css";
import BookContents from "../components/BookContents";

function BookSearch() {
  const [data, setData] = useState([]);
  console.log(data);

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
    setData(resData.items);
  }

  return (
    <main>
      <div className={classes.wrapper}>
        <form onSubmit={getBookInfo}>
          <p>제목 또는 저자명으로 검색하세요 🧐</p>
          <input
            type="text"
            name="keyword"
            id="keyword"
            required
            className={classes.input}
          />
          <button className={classes.button}>검색</button>
        </form>
        <div className={classes.result}>
          <ul>
            {data.map((book) => (
              <BookContents
                key={Math.random()}
                title={book.title}
                author={book.author}
                description={book.description}
                image={book.image}
              />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
export default BookSearch;
