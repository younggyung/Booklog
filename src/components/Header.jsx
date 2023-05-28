import classes from "./Header.module.css";
import { MdPostAdd,MdOutlineLogin,MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <header className={classes.header}>
      <Link to='/'>
      <h1 className={classes.logo}>독서노트</h1></Link>
      <ul className={classes.menus}>
      <li><Link type="button" to="/test"><MdPostAdd size={18}/>테스트 글쓰기</Link></li>
        <li><Link type="button" to="/newpost"><MdPostAdd size={18}/>글쓰기</Link></li>
        <li><Link type="button" to="/search-books"><MdSearch size={18}/>책검색</Link></li>
        <li><Link type="button"><MdOutlineLogin/>로그인</Link></li>
      </ul>
      
    </header>
  );
}
export default Header;
