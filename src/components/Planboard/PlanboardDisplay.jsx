import React, { useEffect, useState, useContext } from "react";
import styles from "./Planboard.module.css";
import FlightContainer from "./FlightContainer";
import AccomContainer from "./AccomContainer";
import ActivityContainer from "./ActivityContainer";
import RestaurantsContainer from "./RestaurantsContainer";
import FlightDetailsInput from "./FlightDetailsInput";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";

const PlanboardDisplay = () => {
  const { id } = useParams();
  const { accessToken } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState([]);

  const getTripData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/trips/" + id,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + accessToken,
          },
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        setTripData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);

  useEffect(() => {
    getTripData();
  }, []);

  return tripData.itineraries && tripData.itineraries?.length === 0 ? (
    <div className={styles.planboarddisplay}>
      <FlightDetailsInput onComplete={nextStep} />

      {currentStep >= 2 && (
        <FlightContainer
          message="Select a Departure Flight"
          flight="departure"
          onComplete={nextStep}
        />
      )}
      {currentStep >= 3 && (
        <FlightContainer
          message="Select a Returning Flight"
          flight="return"
          onComplete={nextStep}
        />
      )}
      {currentStep >= 4 && (
        <AccomContainer
          message="Select an Accommodation"
          onComplete={nextStep}
        />
      )}
      {currentStep >= 5 && (
        <ActivityContainer message="Select Activities" onComplete={nextStep} />
      )}
      {currentStep >= 6 && (
        <RestaurantsContainer
          message="Select Restaurants"
          onComplete={nextStep}
        />
      )}
    </div>
  ) : (
    <div className={styles.planboarddisplay}>
      <FlightDetailsInput />
      <FlightContainer message="Select a Departure Flight" flight="departure" />
      <FlightContainer message="Select a Returning Flight" flight="return" />
      <AccomContainer message="Select an Accommodation" />
      <ActivityContainer message="Select Activities" />
      <RestaurantsContainer message="Select Restaurants" />
    </div>
  );
};

export default PlanboardDisplay;
