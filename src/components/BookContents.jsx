import classes from "./BookContents.module.css";
import { useEffect, useState } from "react";

function BookContents({ title, description, author, image }) {
  const [more, setMore] = useState(false);

  const showMore = () => {
    setMore((prev) => !prev);
  };

  return (
    <li className={classes.li}>
      <h4>{title}</h4>
      <p>저자: {author}</p>
      <div className={classes.div}>
        <a href={image} target="_blank">
          <img src={image} />
        </a>
        {more ? (
          <p>
            {description + "  "}
            <a onClick={showMore} className={classes.more}>[접기]</a>
          </p>
        ) : (
          <p>
            {description.slice(0, 200) + " ..."}
            <a onClick={showMore}className={classes.more}>[더보기]</a>
          </p>
        )}
      </div>
    </li>
  );
}

export default BookContents;
