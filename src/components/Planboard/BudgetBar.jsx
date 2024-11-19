import React, { useEffect, useState, useContext } from "react";
import styles from "./Budgetbar.module.css";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";
import { TripContext } from "../context/TripContext";

const BudgetBar = (props) => {
  const { update } = useContext(TripContext);
  const { accessToken, setAccessToken } = useContext(UserContext);
  const [budget, setBudget] = useState(0);
  const [flightBudget, setFlightBudget] = useState(0);
  const [hotelBudget, setHotelBudget] = useState(0);
  const [activityBudget, setActivityBudget] = useState(0);
  const [foodBudget, setFoodBudget] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  const { id } = useParams();

  const getOneTrip = async () => {
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
        setBudget(data.budget); //ID always return in array!!!!

        const totalFlightBudget = data.itineraries.reduce((sum, flight) => {
          return sum + flight.price;
        }, 0);
        setFlightBudget(totalFlightBudget);

        const totalHotelBudget = data.accoms.reduce((sum, accom) => {
          return (sum + accom.hotelPrice) * data.days;
        }, 0);

        setHotelBudget(totalHotelBudget);
        const totalActivityBudget = data.activities.reduce((sum, activity) => {
          return sum + activity.activityPrice;
        }, 0);
        setActivityBudget(totalActivityBudget);
        const totalFoodBudget = data.restaurants.reduce((sum, restaurant) => {
          return sum + restaurant.foodPrice;
        }, 0);
        setFoodBudget(totalFoodBudget);

        console.log("Trip budget successfully fetched");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateTripBudget = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/trips/" + id,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            budget: budget,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        getOneTripBudget();
        console.log("budget updated");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleSave = () => {
    updateTripBudget();
    setIsUpdate(false);
  };

  useEffect(() => {
    getOneTrip();
  }, [update]);

  //change to percentage
  //const x = 4000 100% = 4000 380/4000 x 100

  const calculateWidth = (inputBudget) => {
    return `${(inputBudget / budget) * 100}%`;
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <label>Current Budget</label>
        {!isUpdate ? (
          <div
            className={styles.budgetinputdiv}
            onClick={() => setIsUpdate(true)}
          >
            <h3>{budget}</h3>
          </div>
        ) : (
          <div className={styles.budgetinputdiv}>
            <input value={budget} onChange={handleBudgetChange} />
            <button className={styles.budgetbtn} onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>
      <div className={styles.budgetbarctnr}>
        <div className={styles.budgetleft}></div>
        <div className={styles.budgetbar}>
          <div
            className={styles.flightbar}
            style={{ width: calculateWidth(flightBudget) }}
          >
            <span className={styles.flighttext}>S${flightBudget}</span>
          </div>
          <div
            className={styles.hotelbar}
            style={{ width: calculateWidth(hotelBudget) }}
          >
            <span className={styles.hoteltext}>S${hotelBudget}</span>
          </div>
          <div
            className={styles.activitybar}
            style={{ width: calculateWidth(activityBudget) }}
          >
            <span className={styles.activitytext}>S${activityBudget}</span>
          </div>
          <div
            className={styles.foodbar}
            style={{ width: calculateWidth(foodBudget) }}
          >
            <span className={styles.foodtext}>S${foodBudget}</span>
          </div>
        </div>
        <div className={styles.budgetright}></div>
      </div>
      <div className={styles.connotation}>
        <div>
          <div
            style={{
              backgroundColor: "#3f612d",
              aspectRatio: "1/1",
              height: "50%",
              border: "1px solid black",
              marginRight: "10px",
            }}
          ></div>
          <p>Flight</p>
        </div>
        <div>
          <div
            style={{
              backgroundColor: "#feea00",
              aspectRatio: "1/1",
              height: "50%",
              border: "1px solid black",
              marginRight: "10px",
            }}
          ></div>
          <p>Accomodation</p>
        </div>
        <div>
          <div
            style={{
              backgroundColor: "#fefadc",
              aspectRatio: "1/1",
              height: "50%",
              border: "1px solid black",
              marginRight: "10px",
            }}
          ></div>
          <p>Activity</p>
        </div>
        <div>
          <div
            style={{
              backgroundColor: "#f3b391",
              aspectRatio: "1/1",
              height: "50%",
              border: "1px solid black",
              marginRight: "10px",
            }}
          ></div>
          <p>Food</p>
        </div>
      </div>
    </>
  );
};

export default BudgetBar;
