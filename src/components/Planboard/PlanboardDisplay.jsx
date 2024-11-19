import React from "react";
import styles from "./Planboard.module.css";
import FlightContainer from "./FlightContainer";
import AccomContainer from "./AccomContainer";
import ActivityContainer from "./ActivityContainer";
import RestaurantsContainer from "./RestaurantsContainer";

const PlanboardDisplay = () => {
  return (
    <div className={styles.planboarddisplay}>
      <FlightContainer message="Select a Departure Flight" flight="departure" />
      <FlightContainer message="Select a Returning Flight" flight="return" />
      <AccomContainer message="Select an Accommodation" />
      <ActivityContainer message="Select Activities" />
      <RestaurantsContainer message="Select Restaurants" />
    </div>
  );
};

export default PlanboardDisplay;
