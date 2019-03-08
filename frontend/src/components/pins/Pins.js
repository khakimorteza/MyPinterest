import React from "react";
import { DisplayPins } from "./DisplayPins.js";
import "../../css/Pins.css";
import Login from "../log/Login.js";
import SignUp from "../log/SignUp.js";

export const Pins = ({
  pins,
  showModal,
  userLogin,
  toggleButton,
  handleSignup
}) => {
  const buttonName = showModal === "login" ? "sign up" : "login";
  pins =
    pins &&
    pins.map(pin => {
      return <DisplayPins key={pin.id || pin.pin_id} pin={pin} />;
    });
  return (
    <>
      {showModal && (
        <button className="login-sign" onClick={toggleButton}>
          {buttonName}
        </button>
      )}
      {showModal === "login" && <Login userLogin={userLogin} />}
      {showModal === "sign up" && <SignUp handleSignup={handleSignup} />}

      <div className={showModal ? "landing" : "images-container"}>{pins}</div>
    </>
  );
};
