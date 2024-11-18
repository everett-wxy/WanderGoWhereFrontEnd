import { createContext, useState } from "react";

const TripContext = createContext();

const TripProvider = ({ children }) => {
  const [update, setUpdate] = useState(0);
  const triggerUpdate = () => setUpdate((prev) => prev + 1);

  return (
    <TripContext.Provider value={{ update, triggerUpdate }}>
      {children}
    </TripContext.Provider>
  );
};

export { TripContext, TripProvider };
