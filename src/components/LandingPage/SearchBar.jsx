import React, { useState } from "react";
import styles from "./LandingPage.module.css";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const getDesitinationData = () => {
    console.log("here's destination data");
  };

  return (
    <>
      <div className={styles.searchbar}>
        <input
          className={styles.searchinput}
          name="searchbar"
          type="text"
          placeholder="Explore Destinations..."
          value={searchInput}
          onChange={handleChange}
        />
        <button className={styles.searchbtn} onClick={getDesitinationData}>
          GO
        </button>
      </div>
    </>
  );
};

export default SearchBar;
