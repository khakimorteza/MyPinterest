import React from "react";
import { Pins } from "../pins/Pins.js";
import "../../css/Home.css";

export const Home = ({ authenticate, pins }) => {
  return (
    <div className="home-page">
      <Pins authenticate={authenticate} pins={pins} />
    </div>
  );
};
