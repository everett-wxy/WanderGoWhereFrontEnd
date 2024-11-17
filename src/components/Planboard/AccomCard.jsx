import React from "react";
import styles from "./Accomboard.module.css";

const AccomCard = (props) => {
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
        <button className={styles.accombtn}>+</button>
      </div>
    </div>
  );
};

export default AccomCard;
