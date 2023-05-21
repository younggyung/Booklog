import classes from "./Modal.module.css";

function Modal ({children,cancel}) {

    function cancelModal(event){
        cancel();
    }
  return (
    <>
      <div className={classes.backDrop} onClick={cancelModal}/>
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
