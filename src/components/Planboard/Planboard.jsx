import React from "react";
import PlanboardDisplay from "./PlanboardDisplay";
import styles from "./Planboard.module.css";

const Planboard = () => {
  return (
    <div className={styles.planboard}>
      <PlanboardDisplay />
    </div>
  );
};

export default Planboard;
