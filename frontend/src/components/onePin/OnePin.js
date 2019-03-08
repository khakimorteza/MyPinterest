import React from "react";
import { withRouter, Link } from "react-router-dom";
import "../../css/OnePin.css";

const validPin = (pin, pinId) => {
  return pin && pin.id === pinId;
};

const OnePin = ({ pin, match, loadOnePin }) => {
  const pinId = Number(match.params.id);
  if (!validPin(pin, pinId)) {
    loadOnePin(pinId);
  }

  return validPin(pin, pinId) ? (
    <div className="image-page">
      <Link className="link-home" to={"/home"}>
        Home
      </Link>
      <div className="image-container">
        <form className="image-form">
          <select>
            <option>photography</option>
          </select>
          <input type="button" value="save" />
        </form>
        <img className="one-img" src={pin.url} alt="" />
      </div>
    </div>
  ) : (
    <div className="image-page">loading</div>
  );
};

export default withRouter(OnePin);
