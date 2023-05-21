import classes from './Post.module.css'

function Post({title,body}) {
  return (
    <div className={classes.background}>
      <p>{title}</p>
      <p>{body}</p>
    </div>
  );
}

export default Post;
