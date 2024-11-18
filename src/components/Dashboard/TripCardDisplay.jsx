import React, { useState, useEffect } from "react";
import TripCard from "./TripCard";
import styles from "./Dashboard.module.css";
import { useContext } from "react";
import UserContext from "../context/user";
import { useNavigate, useParams } from "react-router-dom";

const TripCardDisplay = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState([]);
  const [food, setFood] = useState([]);
  const { accessToken } = useContext(UserContext);
  const [tripsData, setTripsData] = useState([]);

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

  const deleteUserTrip = async (tripId) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/trips",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            id: tripId,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        getUserTrip();
        props.setShowDelCfmModal(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const createTrip = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/trips",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            name: "unnamed trip",
          }),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        navigate(`/planboard/${data.createdTrip._id}`);
        console.log(data._id);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserTrip();
  }, []);

  return tripsData.length > 0 ? (
    <div className={styles.tripcarddisplay}>
      {tripsData.map((trip, idx) => {
        return (
          <TripCard
            key={trip._id}
            tripidx={idx}
            tripname={trip.name}
            destination={trip.city}
            flighttix={trip.flights}
            accom={trip.accoms}
            activity={activity}
            food={food}
            departuredate="yes"
            departuretime="yes"
            returningdate="yes"
            returningtime="yes"
            budget={trip.budget}
            handleContinue={() => {
              navigate(`/planboard/${trip._id}`);
            }}
            handleDelete={() => {
              props.setShowDelCfmModal(true);
              props.setHandleGoFunction(() => () => deleteUserTrip(trip._id));
            }}
          />
        );
      })}
    </div>
  ) : (
    <div className={styles.notripcard}>
      <h3 style={{ padding: "0 0 20px 10px" }}>You have no trips yet.</h3>
      <button onClick={createTrip}>Start Planning</button>
    </div>
  );
};

export default TripCardDisplay;
