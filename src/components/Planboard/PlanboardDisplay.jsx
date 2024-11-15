import React from "react";
import styles from "./Planboard.module.css";
import FlightContainer from "./FlightContainer";
import AccomContainer from "./AccomContainer";

const PlanboardDisplay = () => {
  return (
    <div className={styles.planboarddisplay}>
      <FlightContainer message="Select a Departure Flight" />
      <FlightContainer message="Select a Returning Flight" />
    </div>
  );
};

export default PlanboardDisplay;
