import classes from "./Header.module.css";
import { MdPostAdd, MdOutlineLogin, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import BookSearch from "../routes/BookSearch";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import {auth,db} from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Header() {

  const [nickname,setNickame] = useState();

   //로그인 검증
   const currentUser = auth.currentUser;
   if (currentUser) {
     const userId = currentUser.uid;
     fetchNickname(userId)
   }
   

  //닉네임 가져오기
  async function fetchNickname (userId) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setNickame(userData.nickname);
      } else {
        // 문서가 존재하지 않음
        console.log("해당 사용자의 문서가 존재하지 않습니다.");
      }
    } catch (error) {
      console.log("닉네임 가져오기 실패:", error);
    }
  };
  

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
      auth.signOut();
    }
  };

  const [user, setUser] = useState();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
              {nickname}
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
