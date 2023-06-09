import classes from "./BookContents.module.css";
import { useEffect, useState } from "react";

function BookContents({ title, description, author, image }) {
  //더보기 기능을 위한 state
  const [more, setMore] = useState(false);

  //누를때마다 이전의 state 반대로 변경
  const showMore = () => {
    setMore((prev) => !prev);
  };

  return (
    <li className={classes.li}>
      <h4>{title}</h4>
      <p>저자: {author.replaceAll('^',', ')}</p>
      <div className={classes.div}>
        <a href={image} target="_blank">
          <img src={image} />
        </a>
        {/*more이 true이면 접기, false면 더보기*/}
        {description.length === 0 ? <p className={classes.none}>상세정보가 없습니다.</p>: more ? (
          <p>
            {description + "  "}
            <a onClick={showMore} className={classes.more}>
              [접기]
            </a>
          </p>
        ) : (
          <p>
            {description.slice(0, 200) + " ..."}
            <a onClick={showMore} className={classes.more}>
              [더보기]
            </a>
          </p>
        )} 
       
      </div>
    </li>
  );
}

export default BookContents;
