import React from "react";
import styles from "./LandingPage.module.css";
import SearchBar from "./SearchBar";
import Carousel from "./Carousel";

const LandingPage = () => {
  return (
    <div className={styles.landingpage}>
      <div style={{ marginTop: "300px" }}></div>
      <Carousel />
      <SearchBar />
    </div>
  );
};

export default LandingPage;
