import classes from "./Header.module.css";
import { MdPostAdd, MdOutlineLogin, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import BookSearch from "../routes/BookSearch";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import firebase from "../firebase";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const logoutHandler = () => {
    const logoutConfirm = confirm("로그아웃 하시겠습니까?");
    if (logoutConfirm) {
      firebase.auth().signOut();
    }
  };

  const [user, setUser] = useState();
  console.log(user);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <header className={classes.header}>
      <Link to="/">
        <h1 className={classes.logo}>독서노트</h1>
      </Link>
      <ul className={classes.menus}>
        <li>
          <Link type="button" to="/newpost">
            <MdPostAdd size={18} />
            글쓰기
          </Link>
        </li>
        <li>
          <a onClick={openModal}>
            <MdSearch size={18} />
            책검색
          </a>
        </li>
        <li>
          {user ? (
            <a onClick={logoutHandler}>
              <MdOutlineLogin />
              로그아웃
            </a>
          ) : (
            <Link type="button" to="/login">
              <MdOutlineLogin />
              로그인
            </Link>
          )}
        </li>
      </ul>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <BookSearch />
        </Modal>
      )}
    </header>
  );
}
export default Header;
