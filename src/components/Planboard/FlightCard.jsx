import React from "react";
import styles from "./Planboard.module.css";

const FlightCard = (props) => {
    const handleAddItinerary = async () => {
        try {
            const itinerary = {
                depPort: props.depport,
                depDate: props.depdate,
                depTime: props.deptime,
                arrPort: props.arrport,
                arrDate: props.arrdate,
                arrTime: props.arrtime,
                class: props.class,
                duration: props.duration,
                price: props.price,
                flightType: props.flightType,
                isReturn: props.isReturn,
            };

            const response = await fetch(
                `${import.meta.env.VITE_SERVER}/trips/${
                    props.tripId
                }/itinerary`,
                {
                    // check trips id
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${props.token}`, // check token
                    },
                    body: JSON.stringify({ itinerary }),
                }
            );
            const data = await response.json();
            if (response.ok) {
                alert("Itinerary added successfully!");
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (error) {
            console.error(error);
            alert("Error adding itinerary.");
        }
    };

    return (
        <div className={styles.flightcard}>
            <div className={styles.flightlocationanddate}>
                <div>
                    <h3>{props.depport}</h3>
                    <p>{props.depdate}</p>
                    <p style={{ marginTop: "-15px" }}>{props.deptime}</p>
                </div>
                <div>
                    <div style={{ marginTop: "10px" }}>
                        {/*  if transit data <p>${no} stops</p> ternary expression: else */}
                        {/*  <p>${portname}</p> on another line */}
                        <p>{props.flightType}</p>
                    </div>
                    <div style={{ marginTop: "-10px", fontSize: "25px" }}>
                        <p>&#10230;</p>
                    </div>
                </div>
                <div>
                    <h3>{props.arrport}</h3>
                    <p>{props.arrdate}</p>
                    <p style={{ marginTop: "-15px" }}>{props.arrtime}</p>
                </div>
            </div>
            <p
                style={{
                    color: "var(--submain)",
                    fontWeight: "bolder",
                    justifySelf: "center",
                }}
            >
                {props.class}
            </p>
            <div style={{ height: "15px" }}></div>
            <div className={styles.cardgrid}>
                <div
                    style={{
                        paddingLeft: "20px",
                        marginTop: "-5px",
                        textAlign: "left",
                    }}
                >
                    <p>
                        Duration:{" "}
                        <span style={{ fontWeight: "bolder" }}>
                            {props.duration}
                        </span>
                    </p>
                    <h5>
                        SGD{" "}
                        <span style={{ color: "var(--submain)" }}>
                            {props.price}
                        </span>
                    </h5>
                </div>
                <div style={{ padding: "0 20px 10px 0" }}>
                    <button
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        onClick={handleAddItinerary}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlightCard;
