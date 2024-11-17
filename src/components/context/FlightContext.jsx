import { createContext, useState } from "react";

const FlightContext = createContext();

const FlightProvider = ({ children }) => {
    const [departureFlightData, setDepartureFlightData] = useState(null);
    const [arrivalFlightData, setArrivalFlightData] = useState(null);

    return (
        <FlightContext.Provider
            value={{
                departureFlightData,
                arrivalFlightData,
                setDepartureFlightData,
                setArrivalFlightData,
            }}
        >
            {children}
        </FlightContext.Provider>
    );
};

export { FlightContext, FlightProvider };
