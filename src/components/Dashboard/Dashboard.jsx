import React, { useState } from "react";
import TripCardDisplay from "./TripCardDisplay";
import styles from "./Dashboard.module.css";
import Greeting from "./Greeting";

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  //fetch logged in user trips data.
  return (
    <div className={styles.dashboard}>
      <Greeting
        username="Candy"
        fontstyle={{
          color: "var(--submain)",
          fontSize: "48px",
          fontWeight: "bolder",
        }}
      />
      {trips.length > 0 ? (
        <TripCardDisplay />
      ) : (
        <div className={styles.notripcard}>
          <h3 style={{ padding: "0 0 20px 10px" }}>You have no trips yet.</h3>
          <button>Start Planning</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
