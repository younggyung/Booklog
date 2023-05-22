import classes from './Post.module.css'

function Post({title,body}) {
  return (
    <li className={classes.post}>
      <p>{title}</p>
      <p>{body}</p>
    </li>
  );
}

export default Post;
