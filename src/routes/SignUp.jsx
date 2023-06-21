import { useState } from "react";
import classes from "./Signup.module.css";
import {auth,db}  from '../firebase'
import { useNavigate } from "react-router-dom";
import { collection, setDoc,doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp({closeModal}) {
  const [password, setPassword] = useState(1);
  const [email, setEmail] = useState();
  const [nickname, setNickname] = useState();

  //firebase를 통한 사용자 등록
  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      //이메일,패스워드 등록
      const userCredential = await createUserWithEmailAndPassword(auth,email, password);
      const user = userCredential.user;
      //Firestore에 닉네임 추가
      await setDoc(doc(collection(db, "users"), user.uid),
      {
        nickname: nickname
      });
      alert(email + "계정으로 회원가입되었습니다.");
      closeModal();

    } catch (error) {
      //이메일 사용 검증
      if (error.code === "auth/email-already-in-use") {
        document.getElementById("warning").innerHTML =
          "해당 이메일은 이미 사용 중입니다.";
        document.getElementById("warning").hidden = false;
        //비밀번호 자리수 검증
      } else if (error.code === "auth/weak-password") {
        document.getElementById("warning").innerHTML =
          "비밀번호는 6글자 이상이여야 합니다.";
        document.getElementById("warning").hidden = false;
      } else if (error.code === "auth/invalid-email") {
        document.getElementById("warning").innerHTML =
          "이메일 양식을 다시 확인해주세요.";
        document.getElementById("warning").hidden = false;
      }else{
        console.log(error)
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
          <input
            type="text"
            placeholder="닉네임"
            onChange={(e) => {
              setNickname(e.target.value);
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
