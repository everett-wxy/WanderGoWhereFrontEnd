import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import styles from "./Accomboard.module.css";
import AccomCard from "./AccomCard";
import { useParams } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { toast } from "react-toastify";

const AccomContainer = (props) => {
  const { triggerUpdate, destinationInput } = useContext(TripContext);
  const { accessToken } = useContext(UserContext);
  const [accomsData, setAccomsData] = useState([]);
  const [tripAccomsData, setTripAccomsData] = useState([]);
  const [tripDestination, setTripDestination] = useState("");
  const { id } = useParams();

  //get destination or stored tripAccomsData
  const getTripData = async () => {
    ///grab saved destination here.
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
        setTripDestination(data.itineraries[0]?.arrPort);
        triggerUpdate();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  //GET AccomsData to map out choices.
  const getAccomsData = async (destinationInput) => {
    let city = destinationInput;

    if (city === "IST") {
      city = "Istanbul, Turkey";
    }
    if (city === "CHC") {
      city = "Christchurch, New Zealand";
    }
    if (city === "CTS") {
      city = "Sapporo, Hokkaido, Japan";
    }
    if (city === "TOS") {
      city = "Tromso, Norway";
    }
    if (city === "CAI") {
      city = "Cairo, Egypt";
    }

    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/accoms",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            city: city, //sample - fix for inputs.
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
        await getTripAccomsData();

        triggerUpdate();
        toast.success(<div>🏠 Accommodation Selected.</div>);
        if (props.onComplete) {
          props.onComplete();
        }
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
        await getTripAccomsData();
        triggerUpdate();
        toast.success(<div>🗑️ Accommodation Removed.</div>);
      }
    } catch (error) {
      console.error(error.message);
      return;
    }
  };

  const getTripAccomsData = async () => {
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
        setTripAccomsData(data.accoms);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTripData(); //if trip data has accoms info
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (destinationInput) {
        await getAccomsData(destinationInput);
        await getTripAccomsData();
      }
    };
    fetchData();
  }, [destinationInput]);

  useEffect(() => {
    const fetchData = async () => {
      await getTripData();
      if (tripDestination) {
        await getAccomsData(tripDestination);
        await getTripAccomsData(); //grab the options from this city.
        // same destination.
        // retrive - selected ones.?
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (tripDestination) {
        await getAccomsData(tripDestination);
        await getTripAccomsData();
      }
    };
    fetchData();
  }, [tripDestination]);

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
      {tripAccomsData.length === 0 ? (
        <div className={styles.flightcardbox}>
          {accomsData.map((accom) => {
            return (
              <AccomCard
                key={accom._id}
                hotelImg={accom.imageOne}
                price={accom.hotelPrice}
                hotelName={accom.hotelName}
                onClick={() => {
                  addAccomsToTrip(accom._id);
                }}
                btnMsg="+"
                btnStyle={{ backgroundColor: "var(--main)" }}
              />
            );
          })}
        </div>
      ) : tripAccomsData.length > 0 ? (
        <div className={styles.flightcardbox}>
          <AccomCard
            key={tripAccomsData[0]?._id}
            hotelImg={
              tripAccomsData[0].imageOne ||
              "https://cdn.midjourney.com/c7ecbb3e-4749-4ba7-9511-8803abf27568/0_2.png"
            }
            price={tripAccomsData[0].hotelPrice}
            hotelName={tripAccomsData[0].hotelName}
            onClick={() => delAccomsFromTrip(tripAccomsData[0]._id)}
            btnMsg="Selected"
            btnStyle={{ backgroundColor: "orangered" }}
          />
        </div>
      ) : (
        <p>Loading selected accommodation...</p>
      )}
    </div>
  );
};

export default AccomContainer;
