import React, { useContext, useEffect, useState } from "react";
import styles from "./Planboard.module.css";
import FlightCard from "./FlightCard";
import { FlightContext } from "../context/FlightContext";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";

const FlightContainer = (props) => {
    const { id } = useParams();
    const { accessToken, setAccessToken } = useContext(UserContext);
    const { departureFlightData, arrivalFlightData } =
        useContext(FlightContext);
    const [itineraries, setItineraries] = useState([]);

    const fetchCurrentItinerary = async () => {
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_SERVER
                }/WanderGoWhere/trips/${id}/itinerary`,
                {
                    method: "Get",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("itinerary for current trip fetched");
            setItineraries(data.itineraries);
        } catch (error) {
            console.error("Failed to fetch itineraries:", error);
        }
    };

    useEffect(() => {
        fetchCurrentItinerary();
    }, []);

    const displayedItinerary =
        props.flight === "departure"
            ? itineraries.filter((itinerary) => itinerary.isReturn === false)
            : itineraries.filter((itinerary) => itinerary.isReturn === true);

    console.log("displayed itinerary: " + props.flight, displayedItinerary);
    console.log(displayedItinerary.length === 0);

    if (
        (!departureFlightData ||
            departureFlightData.length === 0 ||
            !arrivalFlightData ||
            arrivalFlightData.length === 0) &&
        displayedItinerary.length === 0
    ) {
        return <div>No flight data available. Please try searching again.</div>;
    }

    let simplifiedFlightData = [];

    if (departureFlightData || arrivalFlightData) {
        const flightData =
            props.flight === "departure" ? departureFlightData : arrivalFlightData;

        simplifiedFlightData = flightData.map((flight) => {
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
                data.flightType = `connecting: ${flight.itineraries[0].segments.length}-leg`;
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
                data.flightType = "non-stop";
            }
            return data;
        });
    }

    // const simplifiedFlightData = flightData.map((flight) => {
    //     console.log(`${props.flight} :`, flight);
    //     let data = {};

    //     if (flight.itineraries[0].segments.length > 1) {
    //         data.depPort = flight.itineraries[0].segments[0].departure.iataCode;
    //         data.depDateTime = flight.itineraries[0].segments[0].departure.at;
    //         const [depDate, depTime] = data.depDateTime.split("T");
    //         data.depDate = depDate;
    //         data.depTime = depTime;
    //         data.arrPort =
    //             flight.itineraries[0].segments[
    //                 flight.itineraries[0].segments.length - 1
    //             ].arrival.iataCode;
    //         data.arrDateTime =
    //             flight.itineraries[0].segments[
    //                 flight.itineraries[0].segments.length - 1
    //             ].arrival.at;
    //         const [arrDate, arrTime] = data.arrDateTime.split("T");
    //         data.arrDate = arrDate;
    //         data.arrTime = arrTime;
    //         data.price = flight.price.total;
    //         data.duration = flight.itineraries[0].duration;
    //         data.flightType = `connecting: ${flight.itineraries[0].segments.length}-leg`;
    //     } else if (flight.itineraries[0].segments.length === 1) {
    //         data.depPort = flight.itineraries[0].segments[0].departure.iataCode;
    //         data.depDateTime = flight.itineraries[0].segments[0].departure.at;
    //         const [depDate, depTime] = data.depDateTime.split("T");
    //         data.depDate = depDate;
    //         data.depTime = depTime;
    //         data.arrPort = flight.itineraries[0].segments[0].arrival.iataCode;
    //         data.arrDateTime = flight.itineraries[0].segments[0].arrival.at;
    //         const [arrDate, arrTime] = data.arrDateTime.split("T");
    //         data.arrDate = arrDate;
    //         data.arrTime = arrTime;
    //         data.price = flight.price.total;
    //         data.duration = flight.itineraries[0].duration;
    //         data.flightType = "non-stop";
    //     }
    //     return data;
    // });

    // need edit
    const handleAddItinerary = async (itinerary) => {
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_SERVER
                }/WanderGoWhere/trips/${id}/itinerary`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ itinerary }),
                }
            );
            const data = await response.json();
            if (response.ok) {
                alert("Itinerary added successfully!");
                fetchCurrentItinerary();
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (error) {
            console.error(error);
            alert("Error adding itinerary.");
        }
    };

    const handleDeleteItinerary = async (itineraryId) => {
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_SERVER
                }/WanderGoWhere/trips/${id}/itinerary`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ itineraryId }), // Pass itineraryId in body
                }
            );
            const data = await response.json();
            if (response.ok) {
                alert("Itinerary deleted successfully!");
                fetchCurrentItinerary();
                // setItineraries(
                //     itineraries.filter(
                //         (itinerary) => itinerary._id !== itineraryId
                //     )
                // );
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting itinerary.");
        }
    };

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
                {displayedItinerary.length > 0
                    ? displayedItinerary.map((itinerary) => (
                          <FlightCard
                              key={itinerary._id}
                              depport={itinerary.depPort}
                              depdate={itinerary.depDate}
                              deptime={itinerary.depTime}
                              arrport={itinerary.arrPort}
                              arrdate={itinerary.arrDate}
                              arrtime={itinerary.arrTime}
                              class="Peasant"
                              duration={itinerary.duration}
                              price={itinerary.price}
                              flightType={itinerary.flightType}
                              onClick={() =>
                                  handleDeleteItinerary(itinerary._id)
                              }
                          />
                      ))
                    : simplifiedFlightData.map((flight, index) => {
                          return (
                              <FlightCard
                                  key={index}
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
                                  isReturn={
                                      props.flight === "departure" ? false : true
                                  }
                                  onClick={handleAddItinerary}
                              />
                          );
                      })}
            </div>
        </div>
    );
};

export default FlightContainer;
