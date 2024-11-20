import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const OverLay = (props) => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  const signIn = async (userInput) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        }
      );
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("accessToken", data.access);
        userCtx.setAccessToken(data.access);
        const decoded = jwtDecode(data.access);
        // userCtx.setUsername(decoded.username);
        props.setShowSigninModal(false);
        navigate("/dashboard");
      } else {
        console.error("Error:", data);
        alert("Incorrect email or password.");
      }
    } catch (error) {
      console.error(error.message);
    }
    setUserInput({ email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div
          className={styles.cancel}
          onClick={() => props.setShowSigninModal(false)}
        >
          <img src="images/cancel-2.png" width="20px" />
        </div>
        <div className={styles.msg}>
          <h2 style={{ lineHeight: "1.4", color: "var(--darkgray)" }}>
            Welcome to
            <span
              style={{
                color: "var(--main)",
                fontFamily: "DynaPuff",
                fontSize: "45px",
              }}
            >
              {" "}
              WANDER
            </span>
            <span
              style={{
                color: "var(--main)",
                fontSize: "45px",
                fontFamily: "DynaPuff",
              }}
            >
              {" "}
              GO
            </span>{" "}
            <span
              style={{
                color: "var(--main)",
                fontSize: "45px",
                fontFamily: "DynaPuff",
              }}
            >
              WHERE?
            </span>
          </h2>
        </div>
        <input
          name="email"
          type="text"
          placeholder="E-mail"
          value={userInput.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={userInput.password}
          onChange={handleChange}
        />

        <button
          className={styles.btn}
          type="submit"
          onClick={() => {
            signIn(userInput);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const SignInModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay setShowSigninModal={props.setShowSigninModal} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};
export default SignInModal;
