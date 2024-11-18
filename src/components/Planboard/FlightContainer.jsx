import React, { useContext, useState } from "react";
import styles from "./Planboard.module.css";
import FlightCard from "./FlightCard";
import { FlightContext } from "../context/FlightContext";

const FlightContainer = (props) => {
    const { departureFlightData, arrivalFlightData } =
        useContext(FlightContext);

    if (
        !departureFlightData ||
        departureFlightData.length === 0 ||
        !arrivalFlightData ||
        arrivalFlightData.length === 0
    ) {
        return <div>No flight data available. Please try searching again.</div>;
    }

    const flightData =
        props.flight === "departure" ? departureFlightData : arrivalFlightData;

    const simplifiedFlightData = flightData.map((flight) => {
        console.log(`${props.flight} :`, flight);
        let data = {};

        if (flight.itineraries[0].segments.length > 1) {
            data.depPort = flight.itineraries[0].segments[0].departure.iataCode;
            data.depDateTime = flight.itineraries[0].segments[0].departure.at;
            const [depDate, depTime] = data.depDateTime.split("T");
            data.depDate = depDate;
            data.depTime = depTime;
            data.arrPort =
                flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                ].arrival.iataCode;
            data.arrDateTime =
                flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                ].arrival.at;
            const [arrDate, arrTime] = data.arrDateTime.split("T");
            data.arrDate = arrDate;
            data.arrTime = arrTime;
            data.price = flight.price.total;
            data.duration = flight.itineraries[0].duration;
            data.flightType =`connecting: ${flight.itineraries[0].segments.length}-leg`
        } else if (flight.itineraries[0].segments.length === 1) {
            data.depPort = flight.itineraries[0].segments[0].departure.iataCode;
            data.depDateTime = flight.itineraries[0].segments[0].departure.at;
            const [depDate, depTime] = data.depDateTime.split("T");
            data.depDate = depDate;
            data.depTime = depTime;
            data.arrPort = flight.itineraries[0].segments[0].arrival.iataCode;
            data.arrDateTime = flight.itineraries[0].segments[0].arrival.at;
            const [arrDate, arrTime] = data.arrDateTime.split("T");
            data.arrDate = arrDate;
            data.arrTime = arrTime;
            data.price = flight.price.total;
            data.duration = flight.itineraries[0].duration;
            data.flightType = 'non-stop'
        }
        return data;
    });

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
                {simplifiedFlightData.map((flight, index) => {
                    return (
                        <FlightCard
                            key={flight.index}
                            depport={flight.depPort}
                            depdate={flight.depDate}
                            deptime={flight.depTime}
                            arrport={flight.arrPort}
                            arrdate={flight.arrDate}
                            arrtime={flight.arrTime}
                            class="Peasant"
                            duration={flight.duration}
                            price={flight.price}
                            flightType={flight.flightType}
                            isReturn={flight === "departure"? false : true }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FlightContainer;
