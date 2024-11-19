import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";

const TripName = () => {
  const { accessToken } = useContext(UserContext);
  const { id } = useParams();
  const [tripName, setTripName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const getTripData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/onetrip/" + id,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + accessToken,
          },
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        setTripName(data.name);
        console.log("Trip budget successfully fetched");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateTripName = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/trips/" + id,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            name: tripName,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        getTripData();
        console.log("budget updated");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleTripNameChange = (e) => {
    setTripName(e.target.value);
  };

  const handleSubmit = () => {
    setIsUpdating(false);
    updateTripName();
  };

  useEffect(() => {
    getTripData();
  }, []);

  return (
    <>
      {!isUpdating ? (
        <div style={{ marginTop: "40px" }}>
          <h1 onClick={() => setIsUpdating(true)}>{tripName}</h1>
        </div>
      ) : (
        <div style={{ marginTop: "40px" }} onDoubleClick={handleSubmit}>
          <h1>
            <input value={tripName} onChange={handleTripNameChange} />
          </h1>
        </div>
      )}
    </>
  );
};

export default TripName;
