import React from "react";
import { DisplayPins } from "./DisplayPins.js";
import "../../css/Pins.css";

export const Pins = ({ pins }) => {
  pins =
    pins &&
    pins.map(pin => {
      return <DisplayPins pin={pin} />;
    });
  return <div className="images-container">{pins}</div>;
};
