import { useState } from "react";
import classes from "./Post.module.css";
import { Link } from "react-router-dom";


function Post({ title, body, id,category,writeDate }) {

  return ( 
      <li className={classes.post}>
        <Link to={"post/" + id} className={classes.link}>
          <h2>{title}</h2>
          <p className={classes.body}>{body}</p>
          <p className={classes.category}>{category + ' l ' + writeDate}</p>
        </Link>
      </li>
  )
    }

export default Post;
