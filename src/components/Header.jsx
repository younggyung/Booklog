import classes from "./Header.module.css";
import { MdPostAdd, MdOutlineLogin, MdSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import BookSearch from "../routes/BookSearch";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/myFirebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import store from '../store/store';
import { loginSuccess,logoutSuccess } from "../store/authSlice";

function Header() {
  const [nickname, setNickname] = useState();
  const navigate = useNavigate();

  //닉네임 가져오기, fetchNickname은 user 정보가 있을때만 실행된 다. 즉, nickname의 유무는 인증유무와 동일

  async function fetchNickname(userId) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        //헤더에 닉네임 표시
        setNickname(userData.nickname)
        //스토어에 닉네임 전달
        return userData.nickname;
      } else {
        console.log("해당 사용자의 문서가 존재하지 않습니다.");
      }
    } catch (error) {
      console.log("닉네임 가져오기 실패:", error);
    }
  }

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
      setNickname(null);
      auth.signOut();
      store.dispatch(logoutSuccess());
    }
  };


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //유저의 메타데이터에서 계정 생성 시간과 최종 로그인 시간을 비교해서, 회원가입시에 자동로그인 되는 현상 방지
      if (user) {
        //user 정보가 있지만, 회원가입으로 인한 유저인증 상태가 아닐때 (=로그인했을때)
        if (user.metadata.creationTime !== user.metadata.lastSignInTime) {
          fetchNickname(user.uid).then((nickname)=>{store.dispatch(loginSuccess({user:user,nickname:nickname}))})
        //회원가입했을때, 인증을 해제하고 로그인 페이지로
        } else {
        auth.signOut();
        navigate("/login");
      }
    };

})}, []);

  return (
    <header className={classes.header}>
      <Link to="/">
        <h1 className={classes.logo}>독서노트</h1>
      </Link>
      <ul className={classes.menus}>
        <li>
          <Link type="button" to={nickname ? "/newpost" : "/login"}>
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
          {nickname ? (
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