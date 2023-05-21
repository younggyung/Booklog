import classes from "./Header.module.css";
import { MdPostAdd,MdOutlineLogin } from 'react-icons/md';

function Header({onPosting}) {

  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>독서노트</h1>
      <ul className={classes.menus}>
        <li><button onClick={onPosting}><MdPostAdd size={18}/>글쓰기</button></li>
        <li><button><MdOutlineLogin/>로그인</button></li>
      </ul>
    </header>
  );
}
export default Header;
