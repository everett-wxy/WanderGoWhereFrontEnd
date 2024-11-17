import React from "react";
import PlanboardDisplay from "./PlanboardDisplay";
import styles from "./Planboard.module.css";
import BudgetBar from "./BudgetBar";

const Planboard = () => {
  return (
    <div className={styles.planboard}>
      <PlanboardDisplay />
    </div>
  );
};

export default Planboard;
