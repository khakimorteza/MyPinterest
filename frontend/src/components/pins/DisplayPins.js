import React from "react";
import { Link } from "react-router-dom";

export const DisplayPins = ({ pin }) => {
  const id = pin.id || pin.pin_id;
  return (
    <div className="display-pins">
      <select>
        <option>photography</option>
      </select>
      <Link to={`/pin/${id}`} key={id}>
        <img className="image " alt="" key={id} src={pin.url} />
      </Link>
    </div>
  );
};
