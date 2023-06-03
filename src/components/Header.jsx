import classes from "./Header.module.css";
import { MdPostAdd,MdOutlineLogin,MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import BookSearch from "../routes/BookSearch";
import { useState } from "react";

function Header() {
  const [bookSearch , setBookSearch] = useState(false);

  const onModal=()=>{
    setBookSearch(true);
  }

  const closeModal=()=>{
    setBookSearch(false);
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
      <h1 className={classes.logo}>독서노트</h1></Link>
      <ul className={classes.menus}>
        <li><Link type="button" to="/newpost"><MdPostAdd size={18}/>글쓰기</Link></li>
        <li><a onClick={onModal}><MdSearch size={18}/>책검색</a></li>
        <li><Link type="button"><MdOutlineLogin/>로그인</Link></li>
      </ul>
        {bookSearch && <BookSearch closeModal={closeModal}/>}
    </header>
  );
}
export default Header;
