import React, { useState, useContext } from "react";
import styles from "./PlanBoard.module.css";
import { FlightContext } from "../context/FlightContext";
import LoadingSpinner from "./LoadingSpinner";

const FlightDetailsInput = (props) => {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [cabinClass, setCabinClass] = useState("ECONOMY");
    const { setDepartureFlightData, setArrivalFlightData } =
        useContext(FlightContext);
    const [isLoading, setIsLoading] = useState(false);

    const [originError, setOriginError] = useState("");
    const [destinationError, setDestinationError] = useState("");

    const validInputs = {
        singapore: "SIN",
        istanbul: "IST",
        tromsø: "TOS",
        tromso: "TOS",
        christchurch: "CHC",
        sapporo: "CTS",
        cairo: "CAI",
        sin: "SIN",
        ist: "IST",
        tos: "TOS",
        chc: "CHC",
        cts: "CTS",
        cai: "CAI",
    };

    const verifyInput = (input) => {
        const lowerCaseInput = input.toLowerCase();
        return validInputs[lowerCaseInput] || null;
    };

    const handleOriginChange = (e) => {
      const value = e.target.value;
      setOrigin(value);
      const verifiedInput = verifyInput(value);
      setOriginError(verifiedInput ? "" : "Invalid origin");
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    const verifiedInput = verifyInput(value);
    setDestinationError(verifiedInput ? "" : "Invalid destination");
};

    const handleSubmit = async (event) => {
        event.preventDefault();

        const originInput = verifyInput(origin);
        const destinationInput = verifyInput(destination);

        if (!originInput || !destinationInput) {
          alert("Please enter valid origin and destination.");
          return;
      }

        const today = new Date().toISOString().split("T")[0];

        if (
            !departureDate ||
            isNaN(new Date(departureDate)) ||
            new Date(departureDate) < new Date(today)
        ) {
            alert("Departure date must be today or later.");
            return;
        }

        if (
            !returnDate ||
            isNaN(new Date(returnDate)) ||
            new Date(returnDate) < new Date(today)
        ) {
            alert("Return date must be today or later.");
            return;
        }

        if (new Date(returnDate) < new Date(departureDate)) {
            alert("Return date must be after departure date.");
            return;
        }

        console.log("Form submitted"); // Check if the form submission is detected
        console.log("origin input: ", originInput);
        console.log("destination input: ", destinationInput);
        // const departureUrl = `http://localhost:5001/WanderGoWhere/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&cabinClass=${cabinClass}`;
        // const arrivalUrl = `http://localhost:5001/WanderGoWhere/flights?origin=${destination}&destination=${origin}&departureDate=${returnDate}&cabinClass=${cabinClass}`;
        const departureUrl = `http://localhost:5001/WanderGoWhere/flights?origin=${originInput}&destination=${destinationInput}&departureDate=${departureDate}&cabinClass=${cabinClass}`;
        const arrivalUrl = `http://localhost:5001/WanderGoWhere/flights?origin=${destinationInput}&destination=${originInput}&departureDate=${returnDate}&cabinClass=${cabinClass}`;
        setIsLoading(true);
        try {
            // Fetch both departure and arrival data in parallel
            const [departureResponse, arrivalResponse] = await Promise.all([
                fetch(departureUrl),
                fetch(arrivalUrl),
            ]);

            // Check if the response is OK before attempting to parse JSON
            if (!departureResponse.ok) {
                throw new Error(
                    `Failed to fetch departure data, status: ${departureResponse.status}`
                );
            }
            if (!arrivalResponse.ok) {
                throw new Error(
                    `Failed to fetch arrival data, status: ${arrivalResponse.status}`
                );
            }

      const departureFlightData = await departureResponse.json();
      const arrivalFlightData = await arrivalResponse.json();
      console.log(departureFlightData);
      setDepartureFlightData(departureFlightData);
      setArrivalFlightData(arrivalFlightData);
      setIsLoading(false);
      if (props.onComplete) {
        console.log("onComplete triggered");
        props.onComplete();
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.flightdetailsinput} style={{ marginBottom: "20px" }}>
      <h1>Flight Search</h1>
      {isLoading ? <LoadingSpinner /> : null}
      <form className={styles.flightform} onSubmit={handleSubmit}>
        <div className={styles.flightformcity}>
          <div>
            <label>Origin:</label>
            <input
              type="text"
              value={origin}
              onChange={handleOriginChange}
              placeholder="Enter origin airport"
            />
            {originError && <p className={styles.errorMessage}>{originError}</p>}
          </div>
          <div>
            <label>Destination:</label>
            <input
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Enter destination airport"
            />
            {destinationError && <p className={styles.errorMessage}>{destinationError}</p>}
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
                </div>
                <div className={styles.cabinselection}>
                    <label>Cabin Class:</label>
                    <select
                        value={cabinClass}
                        onChange={(e) => setCabinClass(e.target.value)}
                    >
                        <option value="ECONOMY">Economy</option>
                        <option value="BUSINESS">Business</option>
                        <option value="FIRST">First Class</option>
                    </select>
                </div>
                <button
                    style={{
                        borderRadius: "0 0 20px 20px",
                        boxShadow: "0 8px 18px rgba(0, 0, 0, 0.6)",
                    }}
                    type="submit"
                >
                    Search Flights
                </button>
            </form>
        </div>
    );
};
export default FlightDetailsInput;
