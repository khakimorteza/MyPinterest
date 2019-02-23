const { db } = require("./connection.js");

const getAllBoards = (req, res, next) => {
  db.any("SELECT * FROM boards")
    .then(boards => {
      res.status(200).json({
        status: "success",
        boards: boards,
        message: "Received all Boards"
      });
    })
    .catch(err => {
      next(err);
    });
};

const getSingleBoard = (req, res, next) => {
  let board_id = parseInt(req.params.id);
  db.one("SELECT * FROM boards WHERE id=$1", board_id)
    .then(board => {
      res.status(200).json({
        status: "success",
        board: board,
        message: "Received ONE Board!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const createABoard = (req, res, next) => {
  db.none(
    "INSERT INTO boards(title, user_id) VALUES(${title}, ${user_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "NEW BOARD ADDED!"
      });
    })
    .catch(err => next(err));
};

const getPinsForABoard = (req, res, next) => {
  let board_id = parseInt(req.params.id);
  db.any(
    "SELECT pins.* FROM boards JOIN pins ON pins.board_id = boards.id WHERE boards.id =$1",
    [board_id]
  )
    .then(pins => {
      res.status(200).json({
        status: "success",
        pins: pins,
        message: "Received all Pins For a Board"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteABoard = (req, res, next) => {
  let boardId = parseInt(req.params.id);
  db.result("DELETE FROM boards WHERE id=$1", boardId)
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "You Delete a board",
        result: result
      });
    })
    .catch(err => {
      return next(err);
    });
};

const editeABoard = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  db.none(
    "UPDATE boards SET " + queryString + " WHERE id=" + req.params.id,
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "You Edite a Board!"
      });
    })
    .catch(err => next(err));
};

module.exports = {
  getAllBoards,
  getSingleBoard,
  createABoard,
  getPinsForABoard,
  deleteABoard,
  editeABoard
};
