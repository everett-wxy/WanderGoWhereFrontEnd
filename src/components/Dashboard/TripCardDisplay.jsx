import React, { useState } from "react";
import TripCard from "./TripCard";
import styles from "./Dashboard.module.css";

const TripCardDisplay = () => {
  const [activity, setActivity] = useState([]);

  return (
    <div className={styles.tripcarddisplay}>
      <TripCard
        tripidx="Trip 1"
        destination="Tromso"
        flighttix="Flight selected"
        accom="Radisson Blu Tromso"
        activity={activity}
        food="5 Food Places planned"
        departuredate="Jan 5, 2025"
        departuretime="07: 30 am"
        returningdate="Jan 25, 2025"
        returningtime="10:30 pm"
        budget="SGD5000"
      />
      <TripCard
        tripidx="Trip 2"
        destination="Tromso"
        flighttix="Flight selected"
        accom="Radisson Blu Tromso"
        activity={activity}
        food="5 Food Places planned"
        departuredate="Jan 5, 2025"
        departuretime="07: 30 am"
        returningdate="Jan 25, 2025"
        returningtime="10:30 pm"
        budget="SGD5000"
      />
      <TripCard
        tripidx="Trip 3"
        destination="Tromso"
        flighttix="Flight selected"
        accom="Radisson Blu Tromso"
        activity={activity}
        food="5 Food Places planned"
        departuredate="Jan 5, 2025"
        departuretime="07: 30 am"
        returningdate="Jan 25, 2025"
        returningtime="10:30 pm"
        budget="SGD5000"
      />
    </div>
  );
};

export default TripCardDisplay;
