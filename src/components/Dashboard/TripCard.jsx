import React, { useState } from "react";
import styles from "./Dashboard.module.css";

const TripCard = (props) => {
  const [showButtons, setShowButtons] = useState(false);

  //attach buttons to hover container
  return (
    <div
      className={styles.tripcardwrapper}
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {showButtons ? (
        <div className={styles.hoverbuttons}>
          <button onClick={props.handleContinue}>Continue Planning</button>
          <button onClick={props.handleDelete}>Delete</button>
        </div>
      ) : (
        <div></div>
      )}
      <div className={styles.tripcard}>
        <div
          className={styles.tripcardcomponent}
          style={{
            borderRadius: "40px 40px 0 0",
            height: "2.5em",
            padding: "10px 0 0 50px",
          }}
        >
          <h6>
            <span style={{ fontWeight: 200 }}>Trip {props.tripidx + 1}: </span>
            {props.tripname}
          </h6>
        </div>
        <div
          style={{
            padding: "20px 0 0 50px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img src="images/plane.png" style={{ height: "50px" }} />
          <div style={{ width: "3%" }}></div>
          <h2 style={{ fontSize: "40px" }}>{props.destination}</h2>
          <div className={styles.tripcarddate}>
            <h5>Dates</h5>
            <div>
              <div>
                <p style={{ marginTop: "10px" }}>{props.departuredate}</p>
                <p style={{ marginTop: "-10px" }}>{props.departuretime}</p>
              </div>
              <div className="col-md-1"></div>
              <div>
                <p style={{ marginTop: "10px" }}>{props.returningdate}</p>
                <p style={{ marginTop: "-10px" }}>{props.returningtime}</p>
              </div>
            </div>
          </div>
        </div>
        <img
          className={styles.destinationimg}
          src="https://cdn.midjourney.com/c7ecbb3e-4749-4ba7-9511-8803abf27568/0_2.png"
          width="30%"
        />
        <div className={styles.listandbudget}>
          <div></div>
          <div></div>
          <ul className={styles.checklist}>
            <li>
              {props.flighttix.length > 0 ? (
                <span>
                  <span style={{ color: "var(--main)", paddingRight: "10px" }}>
                    &#9745;
                  </span>
                  {props.flighttix}
                </span>
              ) : (
                <span>
                  <span style={{ color: "var(--placeholder)" }}>
                    <span style={{ paddingRight: "10px" }}>&#9744;</span> No
                    flights planned
                  </span>
                </span>
              )}
            </li>
            <li>
              {props.accom.length > 0 ? (
                <span>
                  <span style={{ color: "var(--main)", paddingRight: "10px" }}>
                    &#9745;
                  </span>
                  {props.accom}
                </span>
              ) : (
                <span>
                  <span style={{ color: "var(--placeholder)" }}>
                    <span style={{ paddingRight: "10px" }}>&#9744;</span>No
                    accommodations planned
                  </span>
                </span>
              )}
            </li>
            <li>
              {props.activity.length > 0 ? (
                <span>
                  <span style={{ color: "var(--main)", paddingRight: "10px" }}>
                    &#9745;
                  </span>
                  {props.activity}
                </span>
              ) : (
                <span style={{ color: "var(--placeholder)" }}>
                  <span style={{ paddingRight: "10px" }}>&#9744;</span>
                  No activities planned
                </span>
              )}
            </li>
            <li>
              {props.food.length > 0 ? (
                <span>
                  <span style={{ color: "var(--main)", paddingRight: "10px" }}>
                    &#9745;
                  </span>
                  {props.food}
                </span>
              ) : (
                <span>
                  <span style={{ color: "var(--placeholder)" }}>
                    <span style={{ paddingRight: "10px" }}>&#9744;</span>No food
                    planned
                  </span>
                </span>
              )}
            </li>
          </ul>
          <div className={styles.tripcardbudget}>
            <div>
              <h3>Budget</h3>
            </div>
            <div>
              <h2>S${props.budget}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
