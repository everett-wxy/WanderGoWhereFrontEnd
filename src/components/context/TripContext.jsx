import { createContext, useState } from "react";

const TripContext = createContext();

const TripProvider = ({ children }) => {
  const [update, setUpdate] = useState(0);
  const [destinationInput, setDestinationInput] = useState("");
  const triggerUpdate = () => setUpdate((prev) => prev + 1);
  const updateDestinationInput = (newDestination) => {
    setDestinationInput((prev) =>
      prev !== newDestination ? newDestination : prev
    );
  };

  return (
    <TripContext.Provider
      value={{
        update,
        triggerUpdate,
        destinationInput,
        setDestinationInput,
        updateDestinationInput,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export { TripContext, TripProvider };
