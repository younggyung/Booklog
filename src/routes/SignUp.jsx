import { useState } from "react";
import classes from "./Signup.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [password, setPassword] = useState(1);
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert(email + "계정으로 회원가입되었습니다.");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        document.getElementById("warning").innerHTML =
          "해당 이메일은 이미 사용 중입니다.";
        document.getElementById("warning").hidden = false;
      } else if (error.code === "auth/weak-password") {
        document.getElementById("warning").innerHTML =
          "비밀번호는 6글자 이상이여야 합니다.";
        document.getElementById("warning").hidden = false;
      }
    }
  };

  return (
    <div className={classes.div}>
      <h3>회원가입</h3>
      <form onSubmit={signUpHandler}>
        <div className={classes.inputs}>
          <input
            type="email"
            placeholder="이메일@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <p className={classes.warning} id="warning" hidden></p>
          <button>완료</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
