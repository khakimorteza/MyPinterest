import React from "react";
import { withRouter } from "react-router-dom";
import { DisplayBoard } from "./DisplayBoard.js";
import { UserProfile } from "./UserProfile.js";
import "../../css/UserBoards.css";
const UserBoards = ({
  userBoards,
  user,
  getSingleUser,
  boardsAndPinsForAuser,
  match
}) => {
  // if (!userBoards.length) {
  //   console.log("load data");
  //   const userId = 11;
  //   boardsAndPinsForAuser(userId);
  //   return <div>Loading!</div>;
  // }
  console.log("user", user, "userBoards", userBoards);
  if (!user || user.id !== Number(match.params.id) || !userBoards) {
    getSingleUser(match.params.id);
    boardsAndPinsForAuser(match.params.id);
    console.log("user2", user, "userBoards2", userBoards);
    return <div>Loading!</div>;
  }

  const userBoardsDis = userBoards.map(board => {
    return <DisplayBoard key={board.board_id} board={board} />;
  });
  return (
    <div className="user-board-page">
      <UserProfile user={user} />
      <div className="board-container">{userBoardsDis}</div>
    </div>
  );
};

export default withRouter(UserBoards);
