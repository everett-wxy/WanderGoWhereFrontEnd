import React from "react";
import styles from "./Planboard.module.css";

const FlightCard = (props) => {
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
        flightCarrier: props.flightCarrier,
    };

    const duration = props.duration;
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    const hours = parseInt(match[1] || "0", 10); // Extract hours
    const minutes = parseInt(match[2] || "0", 10); // Extract minutes

    const handleButtonClick = () => {
        props.onClick(itinerary);
    };

    return (
        <div className={styles.flightcard}>
            <div>
                <p>{props.flightCarrier}</p>
            </div>
            <div className={styles.flightlocationanddate}>
                <div>
                    <h3>{props.depport}</h3>
                    <p>{props.depdate}</p>
                    <p style={{ marginTop: "-15px" }}>{props.deptime}</p>
                </div>
                <div>
                    <div style={{ marginTop: "10px" }}>
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
                        {hours > 0 ? `${hours} h ` : ""}
                        {minutes > 0 ? `${minutes} m` : ""}
                        </span>
                    </p>
                    <h5>
                        SGD{" "}
                        <span style={{ color: "var(--submain)" }}>
                            {props.price}
                        </span>
                    </h5>
                </div>
            </div>
            <button style={props.style} onClick={handleButtonClick}>
                {props.msg}
            </button>
        </div>
    );
};

export default FlightCard;
