import React from "react";
import styles from "./Planboard.module.css";

const AccomContainer = () => {
  return (
    <div className={styles.flightcontainer}>
      <div
        className={styles.flightctnrcomponent}
        style={{
          borderRadius: "40px 40px 0 0",
          padding: "15px 0 0 50px",
        }}
      >
        <h6>{props.message}</h6>
      </div>
      <div className={styles.flightcardbox}></div>
    </div>
  );
};

export default AccomContainer;
