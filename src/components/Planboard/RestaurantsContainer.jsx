import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import styles from "./Accomboard.module.css";
import ActivityCard from "./ActivityCard";
import { useParams } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";

const RestaurantsContainer = (props) => {
  const { accessToken, setAcceessToken } = useContext(UserContext);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [tripActivitiesData, setTripActivitiesData] = useState([]);
  const [isSelectedBtn, setIsSelectedBtn] = useState(false);
  const { id } = useParams();

  // if tripRestaurantData.includes restaurantId => btn = orange

  const getRestaurantsData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/wanderGoWhere/restaurants",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            city: "Sapporo, Hokkaido, Japan", // sample - fix for inputs.
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
      console.error(errorr.message);
    }
  };

  const addRestaurantsToTrip = async (id) => {
    console.log("Restaurant ID being added:", id);

    const tripRestaurantId = tripActivitiesData.map((item) => {
      item._id;
    }); // current trip restaurant ID

    if (tripRestaurantId.includes(id)) {
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
          body: JSON.stringify({ restaurantsId: id }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to add restaurant");
      } else {
        const data = await res.json();
        console.log("SUCCESS");
        await getRestaurantsData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  

  return (
    <div className={styles.flightcontainer}>
      <div
        classname={styles.flightctnrcomponent}
        style={{ borderRadius: "40px 40px 0 0", padding: "15px 0 0 50px" }}
      >
        <h6>{props.message}</h6>
      </div>

      <div className={styles.fightcardbox}>
        {restaurantsData.map((item) => {
          const isSelected = tripRestaurantsData.includes(restaurants._id);
          console.log(`Restaurant ${restaurants._id} isSelected:`, isSelected);

          return <RestaurantCard />;
        })}
      </div>
    </div>
  );
};

export default RestaurantsContainer;
