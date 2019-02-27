import React from "react";
import { Link } from "react-router-dom";

export const DisplayBoard = ({ board }) => {
  const pins = board.pins.map(pin => {
    return (
      <div key={pin.pin_id} className="board-pin">
        <img alt="" src={pin.url} />
      </div>
    );
  });
  console.log("bp", board);
  return (
    <>
      <Link to={`/board/${board.board_id}`}>
        <div className="main-board">
          <div className="board">{pins}</div>
          <div className="board-title">
            <h3>{board.title}</h3>
          </div>
        </div>
      </Link>
    </>
  );
};
