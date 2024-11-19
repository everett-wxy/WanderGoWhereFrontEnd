import React from "react";
import styles from "./LoadingSpinner.module.css";
import { Triangle } from "react-loader-spinner";

const LoadingSpinner = () => {
    return (
        <div className={styles["spinner-overlay"]}>
            {/* <div className={styles.spinner}></div> */}
            <Triangle
                visible={true}
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="three-dots-loading"
            />
        </div>
    );
};

export default LoadingSpinner;
