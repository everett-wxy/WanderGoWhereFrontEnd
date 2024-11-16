import React from "react";
import PlanboardDisplay from "./PlanboardDisplay";
import styles from "./Planboard.module.css";

const Planboard = () => {
  return (
    <div className={styles.planboard}>
      <div style={{ marginTop: "200px" }}></div>
      <PlanboardDisplay />
    </div>
  );
};

export default Planboard;
