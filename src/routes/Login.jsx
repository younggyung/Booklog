import { useState, useEffect } from "react";
import classes from "./Login.module.css";
import SignUp from "./SignUp";
import Modal from "../components/Modal";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // 유지 정책 설정
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }, []);


  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  //const { isOpen, openModal, closeModal } = useOutletContext();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const loginHandler = async (e) =>{
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert("환영합니다");
      navigate('/')

    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
    {isOpen && 
      <Modal closeModal={closeModal}>
        <SignUp />
      </Modal>
    }
    <div className={classes.container}>
      <section className={classes.loginDiv}>
          <p className={classes.logo}>Dive into your Ocean</p>
          <form onSubmit={loginHandler}>
            <div className={classes.input}>
              <input
                type="text"
                onChange={(e) => setemail(e.target.value)}
                autoComplete="email"
                placeholder="이메일@email.com"
              ></input>
              <input type="password" autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)} placeholder="비밀번호"></input>
              <button>로그인</button>
            </div>
            <p onClick={openModal} className={classes.signUp}>계정이 없으신가요?</p>
          </form>
      </section>
    </div>
    </>
  );
}

export default Login;
