import React from "react";
import { withRouter } from "react-router-dom";
import { Pins } from "../pins/Pins.js";
import "../../css/Board.css";

const BoardPins = ({ boardPins, loadPinsForAboardWithBoard, match }) => {
  console.log("boardpins", boardPins);
  if (!boardPins || boardPins.board_id !== Number(match.params.id)) {
    loadPinsForAboardWithBoard(match.params.id);
    return <div>Loading!</div>;
  }

  return (
    <>
      <div className="board-name">
        <h1>{boardPins.title}</h1>
      </div>
      <h2 className="link">Pins</h2>
      <div className="pins-board-page">
        <Pins pins={boardPins.pins} />
      </div>
    </>
  );
};

export default withRouter(BoardPins);
