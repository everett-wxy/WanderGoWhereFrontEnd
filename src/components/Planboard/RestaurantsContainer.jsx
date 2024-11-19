import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import styles from "./Accomboard.module.css";
import ActivityCard from "./ActivityCard";
import { useParams } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";

const RestaurantsContainer = (props) => {
  const { accessToken, setAccessToken } = useContext(UserContext);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [tripRestaurantsData, setTripRestaurantsData] = useState([]);
  const [isSelectedBtn, setIsSelectedBtn] = useState(false);
  const { id } = useParams();

  // if tripRestaurantData.includes restaurantId => btn = orange

  const getRestaurantsData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/restaurants",
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
      console.error(error.message);
    }
  };

  const addRestaurantsToTrip = async (restaurantId) => {
    console.log("Restaurant ID being added:", restaurantId);

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
        console.log("SUCCESS");
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
        console.log("SUCCESSSFULLT DELETED");
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
        console.log("restaurants data for this trip successfully fetched");
      }
    } catch (error) {
      console.error(error.messasge);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getRestaurantsData();
      await getTripRestaurantsData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated tripRestaurantsData:", tripRestaurantsData);
  }, [tripRestaurantsData]);

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

      <div className={styles.fightcardbox}>
        {restaurantsData.map((item) => {
          const isSelected = tripRestaurantsData.includes(item._id);
          console.log(`Restaurant ${item._id} isSelected:`, isSelected);

          return (
            <RestaurantCard
              key={item._id}
              restaurantImg={item.imageOne}
              price={item.foodPrice}
              restaurantName={item.restaurant}
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
