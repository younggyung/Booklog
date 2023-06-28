import React from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import classes from "./FindAccount.module.css";

function FindAccount() {
  const auth = getAuth();
  const [email, setEmail] = useState();
  const [notice, setNotice] = useState("비밀번호 재설정 메일이 전송됩니다.");

  const sendEmail = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => setNotice("메일이 전송되었습니다. 링크를 눌러 재설정하세요"))
      .catch((error) => {
        console.log(error);
        // ..
      });
  };

  return (
    <div className={classes.div}>
      <h3>비밀번호 찾기</h3>
      <p>{notice}</p>
      <form onSubmit={sendEmail}>
        <div className={classes.input}>
          <input
            type="email"
            placeholder="이메일@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <button>완료</button>
        </div>
      </form>
    </div>
  );
}

export default FindAccount;
