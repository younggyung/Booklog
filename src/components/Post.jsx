import { useState } from "react";
import classes from "./Post.module.css";
import { Link } from "react-router-dom";


function Post({ title, body, id,category,writeDate }) {

  const [isLoading, setIsLoading] = useState(false);
  const clickHandler = () =>{
    console.log('작동')
    setIsLoading(true);
    console.log(isLoading)
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 3초 후에 로딩 완료
  }

  return ( 
    <>
    {isLoading ? (
      <div className={classes.loading}>
        <p>로딩 중...</p>
        </div>
    ) : (
      <li className={classes.post}>
        <Link to={"post/" + id} className={classes.link} onClick={clickHandler}>
          <h2>{title}</h2>
          <p className={classes.body}>{body}</p>
          <p className={classes.category}>{category + ' l ' + writeDate}</p>
        </Link>
      </li>
    )}
  </>
  )
    }

export default Post;
