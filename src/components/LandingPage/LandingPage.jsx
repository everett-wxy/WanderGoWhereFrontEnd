import React from "react";
import styles from "./LandingPage.module.css";
import SearchBar from "./SearchBar";
import Carousel from "./Carousel";
import { TypeAnimation } from "react-type-animation";

const LandingPage = () => {
  return (
    <div className={styles.landingpage}>
      <div
        style={{
          marginTop: "275px",
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
          <div style={{ height: "180px" }}>
            <TypeAnimation
              sequence={["Your next destination, within budget", 1000]}
              wrapper="span"
              speed={30}
              style={{
                fontSize: "40px",
                color: "white",
                display: "inline-block",
              }}
              repeat={Infinity}
            />
          </div>
          <button
            style={{
              borderRadius: "20px",
              width: "50%",
              height: "90px",
              fontSize: "26px",
            }}
            onClick={()=>{
              
            }}
          >
            Find out more
          </button>
        </div>
        <Carousel />
      </div>

      {/* <SearchBar /> */}
    </div>
  );
};

export default LandingPage;
