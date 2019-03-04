import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { DisplayBoard } from "./DisplayBoard.js";
import { UserProfile } from "./UserProfile.js";
import { Pins } from "../pins/Pins.js";

const UserPins = ({
  userPins,
  user,
  getSingleUser,
  loadPinsForAuser,
  match
}) => {
  // TOOD: fix when user has no pins.
  if (!user || user.id !== Number(match.params.id) || !userPins) {
    getSingleUser(match.params.id);
    loadPinsForAuser(match.params.id);
    return <div>Loading!</div>;
  }

  return (
    <div className="user-pins-page">
      <UserProfile user={user} />
      <NavLink to={"/pin-builder"}>pin-builder</NavLink>
      <Pins pins={userPins} />
    </div>
  );
};

export default withRouter(UserPins);
