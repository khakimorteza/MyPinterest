import React from "react";
import { withRouter } from "react-router-dom";
import { Pins } from "../pins/Pins.js";

const BoardPins = ({ boardPins, loadPinsForAboardWithBoard, match }) => {
  console.log("boardpins", boardPins);
  if (!boardPins || boardPins.board_id !== Number(match.params.id)) {
    loadPinsForAboardWithBoard(match.params.id);
    return <div>Loading!</div>;
  }

  return (
    <div>
      <h1>{boardPins.title}</h1>
      <Pins pins={boardPins.pins} />
    </div>
  );
};

export default withRouter(BoardPins);
