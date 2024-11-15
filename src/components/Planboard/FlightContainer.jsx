import React, { useState } from "react";
import styles from "./Planboard.module.css";
import FlightCard from "./FlightCard";

const FlightContainer = (props) => {
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
      <div className={styles.flightcardbox}>
        <FlightCard
          depport="SGP"
          depdate="Jan 7, 2025"
          deptime="03.45am"
          arrport="RMB"
          arrdate="Jan 8, 2025"
          arrtime="5.45pm"
          class="Peasant"
          duration="4h 45min"
          price="243.50"
        />
        <FlightCard
          depport="SGP"
          depdate="Jan 7, 2025"
          deptime="03.45am"
          arrport="RMB"
          arrdate="Jan 8, 2025"
          arrtime="5.45pm"
          class="Peasant"
          duration="4h 45min"
          price="243.50"
        />
        <FlightCard
          depport="SGP"
          depdate="Jan 7, 2025"
          deptime="03.45am"
          arrport="RMB"
          arrdate="Jan 8, 2025"
          arrtime="5.45pm"
          class="Peasant"
          duration="4h 45min"
          price="243.50"
        />
        <FlightCard
          depport="SGP"
          depdate="Jan 7, 2025"
          deptime="03.45am"
          arrport="RMB"
          arrdate="Jan 8, 2025"
          arrtime="5.45pm"
          class="Peasant"
          duration="4h 45min"
          price="243.50"
        />
        <FlightCard
          depport="SGP"
          depdate="Jan 7, 2025"
          deptime="03.45am"
          arrport="RMB"
          arrdate="Jan 8, 2025"
          arrtime="5.45pm"
          class="Peasant"
          duration="4h 45min"
          price="243.50"
        />
      </div>
    </div>
  );
};

export default FlightContainer;
