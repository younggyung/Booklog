import { useContext, useState } from "react";
import classes from "./Login.module.css";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { auth } from "../firebase";
import SignUp from "./SignUp";
import Modal from '../components/Modal';
import { modalContext } from './RootLayout';

function Login() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const foo = useOutletContext();
  console.log(foo)


  return (
    <div className={classes.container}>
      <section className={classes.loginDiv}>
        {isLogin ? (
          <>
            <p className={classes.logo}>(제작중)Dive into your Ocean</p>
            <form>
              <div className={classes.input}>
                <input
                  type="text"
                  onChange={(e) => setId(e.target.value)}
                ></input>
                <input type="password"></input>
                <button>로그인</button>
              </div>
              <Link to={`?mode=${isLogin ? 'signup':'login'}`} className={classes.signUp}>
                계정이 없으신가요?
              </Link>
            </form>
          </>
        ) : (
          <Modal><SignUp/></Modal>
        )}
      </section>
    </div>
  );
}

export default Login;
