import React, { useState, useEffect, useContext } from "react";
import TripCardDisplay from "./TripCardDisplay";
import styles from "./Dashboard.module.css";
import Greeting from "./Greeting";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import PopUpModal from "../ModalCard";

const Dashboard = () => {
  const { username } = useContext(UserContext);
  const [showDelCfmModal, setShowDelCfmModal] = useState(false);
  const [handleGoFunction, setHandleGoFunction] = useState(() => {});

  return (
    <>
      {showDelCfmModal && (
        <PopUpModal
          message="Would you like to delete this trip?"
          handleCancel={() => setShowDelCfmModal(false)}
          handleCancelMsg="Cancel"
          handleGoMsg="Confirm"
          handleGo={handleGoFunction}
        />
      )}
      <div className={styles.dashboard}>
        <Greeting
          username={username}
          fontstyle={{
            color: "var(--submain)",
            fontSize: "48px",
            fontWeight: "bolder",
          }}
        />
        <TripCardDisplay
          setShowDelCfmModal={setShowDelCfmModal}
          setHandleGoFunction={setHandleGoFunction}
        />
      </div>
    </>
  );
};

export default Dashboard;

// message={props.message}
// handleGo={props.handleGo}
// handleDel={props.handleDel}
// handleDelMsg={props.handleDelMsg}
// handleGoMsg={props.handleGoMsg}
// />,
