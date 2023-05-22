import classes from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

function Modal ({children}) {
  const navigate = useNavigate();

    function cancelModal(event){
        navigate('..');
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
