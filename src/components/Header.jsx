import classes from "./Header.module.css";
import { MdPostAdd,MdOutlineLogin,MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import BookSearch from "../routes/BookSearch";
import { useContext, useState } from "react";
import Modal from './Modal'
import { modalContext } from '../routes/RootLayout';

function Header() {

  const {isOpen,openModal,closeModal} = useContext(modalContext);

  return (
    <header className={classes.header}>
      <Link to='/'>
      <h1 className={classes.logo}>독서노트</h1></Link>
      <ul className={classes.menus}>
        <li><Link type="button" to="/newpost"><MdPostAdd size={18}/>글쓰기</Link></li>
        <li><a onClick={openModal}><MdSearch size={18}/>책검색</a></li>
        <li><Link type="button"to='/login'><MdOutlineLogin/>로그인</Link></li>
      </ul>
        {isOpen && <Modal closeModal={closeModal}><BookSearch/></Modal>}
    </header>
  );
}
export default Header;
