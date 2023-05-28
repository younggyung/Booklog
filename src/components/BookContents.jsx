import classes from './BookContents.module.css'

function BookContents({ title, description, author,image }) {
  return (
    <li className={classes.li}>
      <img src={image} width='200px'/>
      <div>
      <h4>{title}</h4>
      <span>{author}</span>  
      <p>{description.slice(0,200)}</p>
      </div>
    </li>
  );
}

export default BookContents;
