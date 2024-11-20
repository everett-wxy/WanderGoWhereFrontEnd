import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const OverLay = (props) => {
  const [userData, setUserData] = useState([]);
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [emailValidation, setEmailValidation] = useState("");
  const [pwValidation, setPwValidation] = useState(""); //check if pw is 10 />
  const [confirmPwInput, setConfirmPwInput] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(""); //check if pw match

  const signUp = async (userInput) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/register",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else alert("You have signed up successfully. Please proceed to log in");
    } catch (error) {
      console.error(error.message); //I GOT QUESTION
      alert("Signed up failed. Please try again");
    }
    setUserInput({ email: "", password: "" });
    setConfirmPwInput("");
    setPasswordMatch("");
  };

  const getUserData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/WanderGoWhere/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      }
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [name]: value.toLowerCase(),
    }));
    if (value === "") {
      setEmailValidation("");
    } else if (value.includes(" ")) {
      setEmailValidation("Spaces");
    } else if (
      userData.find((user) => user.email.toLowerCase() === value.toLowerCase())
    ) {
      setEmailValidation("Unavailable");
    } else if (!value.includes("@")) {
      setEmailValidation("Invalid Email");
    } else setEmailValidation("Available");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({ ...prevInput, [name]: value }));
    if (value === "") {
      setPwValidation("empty");
    } else if (value.length < 10) {
      setPwValidation("tooshort");
    } else if (value.length > 10 && !/[A-Z]/.test(value)) {
      setPwValidation("invalid");
    } else if (value.length > 10 && !/[a-z]/.test(value)) {
      setPwValidation("invalid");
    } else if (value.length > 10 && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      setPwValidation("invalid");
    } else if (value.length > 10 && !/[0-9]/.test(value)) {
      setPwValidation("invalid");
    } else {
      setPwValidation("valid");
    }
  };

  const handlePasswordCheck = (e) => {
    const { name, value } = e.target;
    setConfirmPwInput(value);
    if (value === "") {
      setPasswordMatch("empty");
    } else if (
      value.length === userInput.password.length &&
      value === userInput.password
    ) {
      setPasswordMatch("true");
    } else setPasswordMatch("false");
  };

  const addControlledUserInput = () => {
    if (
      emailValidation === "Available" &&
      passwordMatch === "true" &&
      pwValidation === "valid"
    ) {
      signUp(userInput);
      props.setShowSignupModal(false);
    } else alert("Ensure all fields are filled with valid values.");
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div
          className={styles.cancel}
          onClick={() => props.setShowSignupModal(false)}
        >
          <img src="images/cancel-2.png" width="20px" />
        </div>
        <div className={styles.msg}>
          <h2 style={{ lineHeight: "1.2" }}>
            Find the{" "}
            <span style={{ fontWeight: "bolder" }}>perfect destination</span>{" "}
            for your budget.{" "}
            <span style={{ color: "var(--main)" }}>Sign up</span> now.
          </h2>
        </div>
        <input
          name="email"
          type="text"
          placeholder="E-mail"
          value={userInput.email}
          onChange={handleEmailChange}
        />
        <div className={styles.validation}>
          {emailValidation === "Available" ? (
            <p style={{ color: "green" }}>Available</p>
          ) : emailValidation === "Unavailable" ? (
            <p style={{ color: "red" }}>Unavailable</p>
          ) : emailValidation === "Spaces" ? (
            <p style={{ color: "red" }}>Spaces not allowed</p>
          ) : emailValidation === "Invalid Email" ? (
            <p style={{ color: "red" }}>Invalid</p>
          ) : (
            <p></p>
          )}
        </div>

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={userInput.password}
          onChange={handlePasswordChange}
        />

        <div className={styles.validation}>
          {pwValidation === "valid" ? (
            <p></p>
          ) : pwValidation === "empty" ? (
            <p></p>
          ) : pwValidation === "tooshort" ? (
            <p style={{ color: "red" }}>
              Password has to be at least 10 characters.
            </p>
          ) : pwValidation === "invalid" ? (
            <p style={{ color: "red" }}>
              Password requires an uppercase, special character and a number.
            </p>
          ) : (
            <p></p>
          )}
        </div>

        <input
          name="confirmPwInput"
          type="password"
          placeholder="Confirm Password"
          value={confirmPwInput}
          onChange={handlePasswordCheck}
        />

        <div className={styles.validation}>
          {passwordMatch === "true" ? (
            <p></p>
          ) : passwordMatch === "false" ? (
            <p style={{ color: "red" }}>Password do not match</p>
          ) : (
            <p></p>
          )}
        </div>

        <button
          className={styles.btn}
          type="submit"
          onClick={addControlledUserInput}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const SignUpModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay setShowSignupModal={props.setShowSignupModal} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default SignUpModal;
