import React from "react";
import ReactDOM from "react-dom";
import styles from "../components/Auth/Modal.module.css";

const PopUpModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={styles.popupmodal}>
            <div className={styles.msgdiv}>
              <p>{props.message}</p>
            </div>
            <div className={styles.btndiv}>
              <button className={styles.popupbtn} onClick={props.handleGo}>
                {props.handleGoMsg}
              </button>

              <div style={{ width: "60%" }}></div>
              <button className={styles.popupbtn} onClick={props.handleCancel}>
                {props.handleCancelMsg}
              </button>
            </div>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};
export default PopUpModal;
