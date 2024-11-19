import React, { useState } from "react";
import styles from "./Planboard.module.css";
import FlightContainer from "./FlightContainer";
import AccomContainer from "./AccomContainer";
import ActivityContainer from "./ActivityContainer";
import RestaurantsContainer from "./RestaurantsContainer";

const PlanboardDisplay = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  return (
    <div className={styles.planboarddisplay}>
      <FlightContainer
        message="Select a Departure Flight"
        flight="departure"
        onComplete={nextStep}
      />

      {currentStep >= 2 && (
        <FlightContainer
          message="Select a Returning Flight"
          flight="return"
          onComplete={nextStep}
        />
      )}
      {currentStep >= 3 && (
        <AccomContainer
          message="Select an Accommodation"
          onComplete={nextStep}
        />
      )}
      {currentStep >= 4 && (
        <ActivityContainer message="Select Activities" onComplete={nextStep} />
      )}
      {currentStep >= 5 && (
        <RestaurantsContainer
          message="Select Restaurants"
          onComplete={nextStep}
        />
      )}
    </div>
  );
};

export default PlanboardDisplay;
