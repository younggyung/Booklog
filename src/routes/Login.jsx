import { useState } from "react";
import classes from "./Login.module.css";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { auth } from "../firebase";
import SignUp from "./SignUp";
import Modal from "../components/Modal";

function Login() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  //const { isOpen, openModal, closeModal } = useOutletContext();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
          <p className={classes.logo}>(제작중)Dive into your Ocean</p>
          <form>
            <div className={classes.input}>
              <input
                type="text"
                onChange={(e) => setId(e.target.value)}
                autoComplete='id'
              ></input>
              <input type="password" autoComplete="current-password"></input>
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
