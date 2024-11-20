import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import styles from "./Accomboard.module.css";
import ActivityCard from "./ActivityCard";
import { useParams } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { TripContext } from "../context/TripContext";

const RestaurantsContainer = (props) => {
  const { accessToken } = useContext(UserContext);
  const { triggerUpdate, destinationInput } = useContext(TripContext);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [tripRestaurantsData, setTripRestaurantsData] = useState([]);
  const [tripDestination, setTripDestination] = useState("");
  const { id } = useParams();

  const getTripData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/onetrip/" + id,
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
        setTripDestination(data.itineraries[0]?.arrPort);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getRestaurantsData = async (destinationInput) => {
    let city = destinationInput;

    if (city === "IST") {
      city = "Istanbul, Turkey";
    }
    if (city === "CHC") {
      city = "Christchurch, New Zealand";
    }
    if (city === "CTS") {
      city = "Sapporo, Hokkaido, Japan";
    }
    if (city === "TOS") {
      city = "Tromso, Norway";
    }
    if (city === "CAI") {
      city = "Cairo, Egypt";
    }

    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/restaurants",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            city,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        setRestaurantsData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const addRestaurantsToTrip = async (restaurantId) => {
    const tripRestaurantId = tripRestaurantsData.map((item) => {
      item._id;
    }); // current trip restaurant ID

    if (tripRestaurantId.includes(restaurantId)) {
      alert("Restaurant already selected");
      return;
    }

    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER +
          "/WanderGoWhere/trips/" +
          id +
          "/restaurants",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({ restaurantId: restaurantId }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to add restaurant");
      } else {
        const data = await res.json();
        triggerUpdate();
        await getTripRestaurantsData();
      }
    } catch (error) {
      console.error("Error in addRestaurantsToTrip:", error.message);
    }
  };

  const delRestaurantsFromTrip = async (restaurantId) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER +
          "/WanderGoWhere/trips/" +
          id +
          "/restaurants",
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({ restaurantId: restaurantId }),
        }
      );

      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        triggerUpdate();
        await getTripRestaurantsData();
      }
    } catch (error) {
      console.error(error.mesaage);
      return;
    }
  };

  const getTripRestaurantsData = async () => {
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
        setTripRestaurantsData(data.restaurants || []);
      }
    } catch (error) {
      console.error(error.messasge);
    }
  };

  useEffect(() => {
    if (destinationInput) {
      const fetchData = async () => {
        await getRestaurantsData(destinationInput);
        await getTripRestaurantsData();
      };
      fetchData();
    }
  }, [destinationInput]);

  useEffect(() => {
    getTripData();
    const fetchData = async () => {
      console.log("trip destination:", tripDestination);
      if (tripDestination) {
        await getRestaurantsData(tripDestination);
        await getTripRestaurantsData();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Updated trip destination:", tripDestination);
      if (tripDestination) {
        await getRestaurantsData(tripDestination);
        await getTripRestaurantsData();
      }
    };
    fetchData();
  }, [tripDestination]);

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
        {restaurantsData.map((item) => {
          const isSelected = tripRestaurantsData.includes(item._id);

          return (
            <RestaurantCard
              key={item._id}
              restaurantImg={item.imageOne}
              price={item.foodPrice}
              restaurant={item.restaurant}
              tier={item.tier}
              onClick={() => {
                if (isSelected) {
                  delRestaurantsFromTrip(item._id);
                } else {
                  addRestaurantsToTrip(item._id);
                }
              }}
              // Change button message dynamically based on selection state
              btnMsg={isSelected ? "Selected" : "+"}
              // Change button style dynamically
              btnStyle={{
                backgroundColor: isSelected ? "orangered" : "var(--main)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsContainer;
