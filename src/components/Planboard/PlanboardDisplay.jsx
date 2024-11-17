import React from "react";
import styles from "./Planboard.module.css";
import FlightContainer from "./FlightContainer";
import AccomContainer from "./AccomContainer";

const PlanboardDisplay = () => {
  return (
    <div className={styles.planboarddisplay}>
      <FlightContainer message="Select a Departure Flight" flight="departure"/>
      <FlightContainer message="Select a Returning Flight" flight="return"/>
    </div>
  );
};

export default PlanboardDisplay;
