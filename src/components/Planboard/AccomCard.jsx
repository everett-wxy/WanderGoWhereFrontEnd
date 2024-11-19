import React, { useState } from "react";
import styles from "./Accomboard.module.css";

const AccomCard = (props) => {
  return (
    <div className={styles.flightcard}>
      <div className={styles.imgwrapper}>
        <img className={styles.hotelimg} src={props.hotelImg} alt={hotelName} />
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
          style={props.btnStyle}
          onClick={props.onClick}
        >
          {props.btnMsg}
        </button>
      </div>
    </div>
  );
};

export default AccomCard;
