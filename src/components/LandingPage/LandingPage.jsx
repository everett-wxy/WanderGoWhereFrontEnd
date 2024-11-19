import React from "react";
import styles from "./LandingPage.module.css";
import SearchBar from "./SearchBar";
import Carousel from "./Carousel";

const LandingPage = () => {
  return (
    <div className={styles.landingpage}>
      <div
        style={{
          marginTop: "300px",
        }}
      ></div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "38%", paddingLeft: "150px" }}>
          <h1
            style={{
              color: "var(--main)",
              fontSize: "100px",
              fontFamily: "Dynapuff",
            }}
          >
            WANDER GO WHERE?
          </h1>
          <p style={{ color: "white" }}>Your next destination, within budget</p>
          <button style={{ borderRadius: 0 }}>Find out more</button>
        </div>
        <Carousel />
      </div>

      {/* <SearchBar /> */}
    </div>
  );
};

export default LandingPage;
