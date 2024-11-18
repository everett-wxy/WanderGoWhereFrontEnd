import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import styles from "./Accomboard.module.css";
import AccomCard from "./AccomCard";
import { useParams } from "react-router-dom";
import { TripContext } from "../context/TripContext";

const AccomContainer = (props) => {
  const { triggerUpdate } = useContext(TripContext);
  const { accessToken, setAccessToken } = useContext(UserContext);
  const [accomsData, setAccomsData] = useState([]);
  const [tripAccomsIdData, setTripAccomsIdData] = useState(""); //for showing Accoms ID . and toggling
  const [selectedAccomsData, setSelectedAccomsData] = useState([]);
  const { id } = useParams();

  //GET AccomsData to map out choices.
  const getAccomsData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/accoms",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            city: "Sapporo, Hokkaido, Japan", //sample - fix for inputs.
          }),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        setAccomsData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  //if tipAccomsID === 0
  const addAccomsToTrip = async (accomId) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/trips/" + id + "/accoms",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            accomsId: accomId,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        console.log("SUCCESS");
        triggerUpdate();
      }
    } catch (error) {
      console.error(error.message);
      return;
    }
  };

  //if tripAccomsID > 0
  const delAccomsFromTrip = async (accomId) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/trips/" + id + "/accoms",
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            accomsId: accomId,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        console.log("SUCCESSFULLY DELETED");
        triggerUpdate();
      }
    } catch (error) {
      console.error(error.message);
      return;
    }
  };

  const getTripAccomsIdData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/trips/" + id,
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
        setTripAccomsIdData(data.accoms?.[0]); //ID always return in array!!!!
        console.log("accoms data for this trip successfully fetched");
      }
    } catch (error) {
      console.error(error.message);
    }
  }; //do backend condition that there can only be one ID
  //ONLY ONE ID .

  const handleAddAccomsToTrip = (accomId) => {
    if (tripAccomsIdData) {
      alert("already selected an accoms");
    } else addAccomsToTrip(accomId);
    setTripAccomsIdData(accomId);
    getPopulatedAccomsData(accomId);
  };

  const handleDelAccomsFromTrip = (accomId) => {
    delAccomsFromTrip(accomId);
    setTripAccomsIdData("");
    setSelectedAccomsData([]);
  };

  const getPopulatedAccomsData = async (accomId) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/accoms/id",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            _id: accomId,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        setSelectedAccomsData([data]);
        console.log("Populated Accom data successfully fetched");
      }
    } catch (error) {
      console.error(error.message);
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAccomsData();
      await getTripAccomsIdData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (tripAccomsIdData) {
      console.log("Trip Accommodations Data Updated:", tripAccomsIdData);
      getPopulatedAccomsData(tripAccomsIdData);
    }
  }, [tripAccomsIdData]);

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
      {!tripAccomsIdData ? (
        <div className={styles.flightcardbox}>
          {accomsData.map((accom) => {
            return (
              <AccomCard
                key={accom._id}
                hotelImg={accom.imageOne}
                price={accom.hotelPrice}
                hotelName={accom.hotelName}
                onClick={() => {
                  handleAddAccomsToTrip(accom._id);
                }}
                btnMsg="+"
              />
            );
          })}
        </div>
      ) : selectedAccomsData[0] ? (
        <div className={styles.flightcardbox}>
          <AccomCard
            key={selectedAccomsData[0]?._id}
            hotelImg={
              selectedAccomsData[0].imageOne ||
              "https://cdn.midjourney.com/c7ecbb3e-4749-4ba7-9511-8803abf27568/0_2.png"
            }
            price={selectedAccomsData[0].hotelPrice}
            hotelName={selectedAccomsData[0].hotelName}
            onClick={() => handleDelAccomsFromTrip(tripAccomsIdData)}
            btnMsg="Selected"
          />
        </div>
      ) : (
        <p>Loading selected accommodation...</p>
      )}
    </div>
  );
};

export default AccomContainer;
