import React, { useState, useEffect, useContext } from "react";
import TripCardDisplay from "./TripCardDisplay";
import styles from "./Dashboard.module.css";
import Greeting from "./Greeting";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";

const Dashboard = () => {
  const navigate = useNavigate();
  const { accessToken } = useContext(UserContext);
  const [tripsData, setTripsData] = useState([]);
  //fetch logged in user trips data.

  const getUserTrip = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/trips",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accessToken,
          },
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        setTripsData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserTrip();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Greeting
        username="Placeholder"
        fontstyle={{
          color: "var(--submain)",
          fontSize: "48px",
          fontWeight: "bolder",
        }}
      />
      {tripsData.length > 0 ? (
        <TripCardDisplay />
      ) : (
        <div className={styles.notripcard}>
          <h3 style={{ padding: "0 0 20px 10px" }}>You have no trips yet.</h3>
          <button onClick={() => navigate("/planboard")}>Start Planning</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
