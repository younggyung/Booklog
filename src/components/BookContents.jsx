import classes from './BookContents.module.css'

function BookContents({ title, description, author,image }) {
  return (
    <li className={classes.li}>
      <h4>{title}</h4>
      <p>저자: {author}</p>
      <div className={classes.div}>
      <a href={image}target='_blank'><img src={image}/></a>
      <p>{description.slice(0,200)} <a href='#'>...더보기</a></p>
      </div>
    </li>
  );
}

export default BookContents;
