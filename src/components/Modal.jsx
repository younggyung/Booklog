import { useEffect } from "react";
import React from "react";
import classes from "./Modal.module.css";

function Modal({ children, closeModal,id }) {
  //모달창 실행시, 백그라운드 스크롤은 중지
  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);


  return (
    <>
      <div className={classes.backDrop} onClick={closeModal} />
      <dialog open className={classes.modal}>
      {children}
      </dialog>
    </>
  );
}

export default Modal;
