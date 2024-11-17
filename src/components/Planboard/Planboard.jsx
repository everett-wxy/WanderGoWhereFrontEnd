import React from "react";
import PlanboardDisplay from "./PlanboardDisplay";
import styles from "./Planboard.module.css";
import FlightDetailsInput from "./FlightDetailsInput";
import { FlightProvider } from "../context/FlightContext";

const Planboard = () => {
  return (
    <FlightProvider>
    <div className={styles.planboard}>
      <FlightDetailsInput/>
      <PlanboardDisplay />
    </div>
    </FlightProvider>
  );
};

export default Planboard;
