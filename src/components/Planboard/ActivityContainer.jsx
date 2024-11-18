import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import styles from "./Accomboard.module.css";
import ActivityCard from "./ActivityCard";
import { useParams } from "react-router-dom";

const ActivityContainer = (props) => {
  const { accessToken, setAccessToken } = useContext(UserContext);
  const [activitiesData, setActivitiesData] = useState([]);
  const [tripActivitiesData, setTripActivitiesData] = useState([]);
  const [isSelectedBtn, setIsSelectedBtn] = useState(false);
  const { id } = useParams();

  //if tripActivitiesData.include activityId => btn = orange

  const getActivitiesData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/activities",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            city: "Cairo, Egypt", //sample - fix for inputs.
          }),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        setActivitiesData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const addActivityToTrip = async (activityId) => {
    console.log("Activity ID being added:", activityId);

    const tripActivityIds = tripActivitiesData.map((activity) => activity._id); // get current trip activity IDs
    if (tripActivityIds.includes(activityId)) {
      alert("Activity already selected");
      return;
    }

    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER +
          "/WanderGoWhere/trips/" +
          id +
          "/activities",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            activitiesId: activityId,
          }),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to add activity");
      } else {
        const data = await res.json();
        console.log("SUCCESS");
        await getTripActivitiesData();
      }
    } catch (error) {
      console.error("Error in addActivitiesToTrip:", error.message);
    }
  };

  const delActivityFromTrip = async (activityId) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER +
          "/WanderGoWhere/trips/" +
          id +
          "/activities",
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            activitiesId: activityId,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        console.log("SUCCESSFULLY DELETED");
        await getTripActivitiesData();
      }
    } catch (error) {
      console.error(error.message);
      return;
    }
  };

  const getTripActivitiesData = async () => {
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
        setTripActivitiesData(data.activities || []);
        console.log("activities data for this trip successfully fetched");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getActivitiesData();
      await getTripActivitiesData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated tripActivitiesData:", tripActivitiesData);
  }, [tripActivitiesData]);

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
        {activitiesData.map((activity) => {
          const isSelected = tripActivitiesData.includes(activity._id);
          console.log(`Activity ${activity._id} isSelected:`, isSelected);

          return (
            <ActivityCard
              key={activity._id}
              hotelImg={
                activity.imageOne ||
                "https://cdn.midjourney.com/c7ecbb3e-4749-4ba7-9511-8803abf27568/0_2.png"
              }
              price={activity.activityPrice}
              hotelName={activity.activityName}
              onClick={() => {
                if (isSelected) {
                  delActivityFromTrip(activity._id);
                } else {
                  addActivityToTrip(activity._id);
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

//if tripActivitiesData.include activityId => btn = orange

export default ActivityContainer;
