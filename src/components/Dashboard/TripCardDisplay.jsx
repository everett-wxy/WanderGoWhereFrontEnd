import React, { useState, useEffect } from "react";
import TripCard from "./TripCard";
import styles from "./Dashboard.module.css";
import { useContext } from "react";
import UserContext from "../context/user";
import { useNavigate, useParams } from "react-router-dom";

const TripCardDisplay = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useContext(UserContext);
  const [tripsData, setTripsData] = useState([]);

  const imagestray = [
    {
      url: "https://cdn.midjourney.com/84b73cc6-b31d-4ba3-82f6-ca1bfbc3608f/0_2.png",
      country: "Norway, Tromso",
    },
    {
      url: "https://cdn.midjourney.com/9f50d26d-42ee-41b4-b934-12225f98843a/0_3.png",
      title: "Japan, Sapporo",
    },
    {
      url: "https://cdn.midjourney.com/aba2e0b3-2bcb-4e4e-b928-eb0499dde040/0_3.png",
      title: "Egypt, Cairo",
    },
    {
      url: "https://cdn.midjourney.com/8867e8d0-d6fc-4aa7-9449-45a344173e45/0_3.png",
      title: "Turkey, Istanbul",
    },
    {
      url: "https://cdn.midjourney.com/c548e6d4-e23b-46b8-bb04-f76c8f0648cd/0_2.png",
      title: "New Zealand, Christchurch",
    },
  ];

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
            destination={
              Array.isArray(trip.itineraries) && trip.itineraries.length > 0
                ? (trip.itineraries[0]?.arrPort === "TOS" && "Tromso") ||
                  (trip.itineraries[0]?.arrPort === "CTS" && "Sapporo") ||
                  (trip.itineraries[0]?.arrPort === "CHC" && "Christchurch") ||
                  (trip.itineraries[0]?.arrPort === "IST" && "Istanbul") ||
                  (trip.itineraries[0]?.arrPort === "CAI" && "Cairo") ||
                  "Select a city"
                : "Select a city"
            }
            destinationImg={
              Array.isArray(trip.itineraries) && trip.itineraries.length > 0
                ? (trip.itineraries[0]?.arrPort === "TOS" &&
                    imagestray[0].url) ||
                  (trip.itineraries[0]?.arrPort === "CTS" &&
                    imagestray[1].url) ||
                  (trip.itineraries[0]?.arrPort === "CHC" &&
                    imagestray[4].url) ||
                  (trip.itineraries[0]?.arrPort === "IST" &&
                    imagestray[3].url) ||
                  (trip.itineraries[0]?.arrPort === "CAI" && imagestray[2].url)
                : "https://cdn.midjourney.com/611ba752-f809-4bbb-af71-a0524fc92ba1/0_2.png"
            }
            flighttix={trip.itineraries.length}
            accom={trip.accoms.length}
            activity={trip.activities.length}
            food={trip.restaurants.length}
            departuredate={
              Array.isArray(trip.itineraries) && trip.itineraries.length > 0
                ? trip.itineraries[0]?.depDate || "Departure Date"
                : "Departure Date"
            }
            departuretime={
              Array.isArray(trip.itineraries) && trip.itineraries.length > 0
                ? trip.itineraries[0]?.depTime || "Departure Time"
                : "Departure Date"
            }
            returningdate={
              Array.isArray(trip.itineraries) && trip.itineraries.length > 0
                ? trip.itineraries[1]?.arrDate || "Arrival Date"
                : "Arrival Date"
            }
            returningtime={
              Array.isArray(trip.itineraries) && trip.itineraries.length > 0
                ? trip.itineraries[1]?.arrTime || "Arrival Time"
                : "Arrival Time"
            }
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
