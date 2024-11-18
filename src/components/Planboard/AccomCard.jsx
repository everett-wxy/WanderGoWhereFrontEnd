import React, { useState } from "react";
import styles from "./Accomboard.module.css";

const AccomCard = (props) => {
  // const handleClick = async () => {
  //   await props.onClick();
  // };

  // const undoClick = async () => {
  //   await props.onUndoClick();
  // };

  return (
    <div className={styles.flightcard}>
      <div className={styles.imgwrapper}>
        <img
          className={styles.hotelimg}
          src="https://cdn.midjourney.com/c7ecbb3e-4749-4ba7-9511-8803abf27568/0_2.png"
        />
      </div>
      <div
        style={{ paddingLeft: "20px", marginTop: "-5px", textAlign: "left" }}
      >
        <p style={{ paddingTop: "20px" }}>
          <span style={{ fontWeight: "bolder" }}>{props.hotelName}</span>
        </p>
        <h5>
          SGD<span style={{ color: "var(--submain)" }}>{props.price}</span>
        </h5>
      </div>
      <div className={styles.accombtndiv}>
        <button
          className={styles.accombtn}
          style={{ backgroundColor: "var(--main)" }}
          onClick={props.onClick}
        >
          {props.btnMsg}
        </button>
        {/* {!props.clickedBtn ? (
          <button
            className={styles.accombtn}
            style={{ backgroundColor: "var(--main)" }}
            onClick={handleClick}
          >
            +
          </button>
        ) : (
          <button
            className={styles.accombtn}
            style={{ backgroundColor: "orangered" }}
            onClick={undoClick}
          >
            Selected
          </button> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default AccomCard;
