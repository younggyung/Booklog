import { useEffect } from "react";
import classes from "./Modal.module.css";

function Modal ({children,closeModal}) {

  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
    	$body.style.overflow = overflow
    };
  }, []);


  return (
    <>
      <div className={classes.backDrop} onClick={closeModal}/>
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
