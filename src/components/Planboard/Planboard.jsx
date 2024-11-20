import React from "react";
import PlanboardDisplay from "./PlanboardDisplay";
import styles from "./Planboard.module.css";
import FlightDetailsInput from "./FlightDetailsInput";
import BudgetBar from "./BudgetBar";
import { TripProvider } from "../context/TripContext";
import { FlightProvider } from "../context/FlightContext";
import { useParams } from "react-router-dom";
import TripName from "./TripName";

const Planboard = () => {
  const { id } = useParams();
  return (
    <TripProvider>
      <FlightProvider>
        <div className={styles.planboard}>
          <div style={{ marginTop: "180px" }}></div>
          <BudgetBar />
          <TripName />
          <FlightDetailsInput />
          <PlanboardDisplay />
        </div>
      </FlightProvider>
    </TripProvider>
  );
};

export default Planboard;
