import React from "react";
import { withRouter } from "react-router-dom";
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
  // if (!userPins.length) {
  //   console.log("load data");
  //   const userId = 11;
  //   loadPinsForAuser(userId);
  //   return <div>Loading!</div>;
  // }
  console.log("pins", userPins);
  if (!user || user.id !== Number(match.params.id) || !userPins.length) {
    getSingleUser(match.params.id);
    loadPinsForAuser(match.params.id);
    return <div>Loading!</div>;
  }

  return (
    <div className="user-pins-page">
      <UserProfile user={user} />
      <Pins pins={userPins} />
    </div>
  );
};

export default withRouter(UserPins);
