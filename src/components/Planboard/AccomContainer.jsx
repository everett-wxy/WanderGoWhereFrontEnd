import React, { useState, useEffect } from "react";
import styles from "./Accomboard.module.css";
import AccomCard from "./AccomCard";
import { useParams } from "react-router-dom";

const AccomContainer = (props) => {
  const [accomsData, setAccomsData] = useState([]);
  const { id } = useParams();

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

  const addAccomsToTrip = async (accomId) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "trips/" + id + "/accoms",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringiy({
            accomsId: accomId,
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

  useEffect(() => {
    getAccomsData();
  }, []);

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
        {accomsData.map((accom) => {
          return (
            <AccomCard
              key={accom._id}
              hotelImg={accom.imageOne}
              price={accom.hotelPrice}
              hotelName={accom.hotelName}
              accombtn={() => {
                addAccomsToTrip(id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AccomContainer;

{
  /* <div className={styles.flightcard}>
<div className={styles.imgwrapper}>
  <img
    className={styles.hotelimg}
    src="https://cdn.midjourney.com/c7ecbb3e-4749-4ba7-9511-8803abf27568/0_2.png"
  />
</div>
<div
  style={{ paddingLeft: "20px", marginTop: "-5px", textAlign: "left" }}
>
  <p style={{ paddingTop: "20px" }}>
    <span style={{ fontWeight: "bolder" }}>{props.hotelName}</span>
  </p>
  <h5>
    SGD<span style={{ color: "var(--submain)" }}>{props.price}</span>
  </h5>
</div>
<div className={styles.accombtndiv}>
  <button className={styles.accombtn}>+</button>
</div>
</div> */
}
