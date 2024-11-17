import React, { useState } from "react";
import styles from "./Budgetbar.module.css";

const BudgetBar = (props) => {
  const [budget, setBudget] = useState(4000);
  const [flightBudget, setFlightBudget] = useState(380);
  const [hotelBudget, setHotelBudget] = useState(200);
  const [activityBudget, setActivityBudget] = useState(400);
  const [foodBudget, setFoodBudget] = useState(450);

  //change to percentage
  //const x = 4000 100% = 4000 380/4000 x 100

  const calculateWidth = (inputBudget) => {
    return `${(inputBudget / budget) * 100}%`;
  };

  return (
    <>
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
