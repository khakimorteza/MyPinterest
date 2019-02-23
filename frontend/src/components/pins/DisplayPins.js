import React from "react";
import { Link } from "react-router-dom";

export const DisplayPins = ({ pin }) => {
  return (
    <div className="display-pins">
      <select>
        <option>photography</option>
      </select>
      <Link to={"/pin/" + pin.id} key={pin.id}>
        <img className="image " alt="" src={pin.url} />
      </Link>
    </div>
  );
};
