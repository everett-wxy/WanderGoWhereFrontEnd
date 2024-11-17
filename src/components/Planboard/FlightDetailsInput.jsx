import React, { useState, useContext } from "react";
import styles from "./PlanBoard.module.css";
import { FlightContext } from "../context/FlightContext";

const FlightDetailsInput = () => {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [cabinClass, setCabinClass] = useState("ECONOMY");
    const { setDepartureFlightData, setArrivalFlightData } = useContext(FlightContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const departureUrl = `http://localhost:5001/WanderGoWhere/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&cabinClass=${cabinClass}`;
        const arrivalUrl = `http://localhost:5001/WanderGoWhere/flights?origin=${destination}&destination=${origin}&departureDate=${returnDate}&cabinClass=${cabinClass}`;
        try {
            // Fetch both departure and arrival data in parallel
            const [departureResponse, arrivalResponse] = await Promise.all([
                fetch(departureUrl),
                fetch(arrivalUrl),
            ]);

            // Check if the response is OK before attempting to parse JSON
            if (!departureResponse.ok) {
                throw new Error(`Failed to fetch departure data, status: ${departureResponse.status}`);
            }
            if (!arrivalResponse.ok) {
                throw new Error(`Failed to fetch arrival data, status: ${arrivalResponse.status}`);
            }

            const departureFlightData = await departureResponse.json();
            const arrivalFlightData = await arrivalResponse.json();
            
            console.log("Departure Flight Data:", departureFlightData);
            setDepartureFlightData(departureFlightData);

            console.log("Arrival Flight Data:", arrivalFlightData);
            setArrivalFlightData(arrivalFlightData);

        } catch (error) {
            console.error("Error fetching flight data:", error);
        }
    };

    return (
        <div className={styles.flightdetailsinput}>
            <h1>Flight Search</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Origin:</label>
                    <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        placeholder="Enter origin airport"
                    />
                </div>
                <div>
                    <label>Destination:</label>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Enter destination airport"
                    />
                </div>
                <div>
                    <label>Departure Date:</label>
                    <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Return Date:</label>
                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Cabin Class:</label>
                    <select
                        value={cabinClass}
                        onChange={(e) => setCabinClass(e.target.value)}
                    >
                        <option value="ECONOMY">Economy</option>
                        <option value="BUSINESS">Business</option>
                    </select>
                </div>
                <button type="submit">Search Flights</button>
            </form>
        </div>
    );
};

export default FlightDetailsInput;