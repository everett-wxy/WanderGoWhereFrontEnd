import React, { useState, useEffect, useContext } from "react";
import TripCardDisplay from "./TripCardDisplay";
import styles from "./Dashboard.module.css";
import Greeting from "./Greeting";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";

const Dashboard = () => {
  const { username } = useContext(UserContext);

  return (
    <div className={styles.dashboard}>
      <Greeting
        username={username}
        fontstyle={{
          color: "var(--submain)",
          fontSize: "48px",
          fontWeight: "bolder",
        }}
      />
      <TripCardDisplay />
    </div>
  );
};

export default Dashboard;
