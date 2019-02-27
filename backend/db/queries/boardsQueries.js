const { db } = require("./connection.js");
const _ = require("lodash");

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

const getABoardWithPins = (req, res, next) => {
  let board_id = parseInt(req.params.id);
  db.any(
    "SELECT  boards.title, pins.url, pins.id AS pin_id, pins.board_id FROM boards JOIN pins  ON boards.id = pins.board_id  WHERE boards.id =$1",
    [board_id]
  )

    .then(data => {
      const boards = _(data)
        .uniqBy("board_id")
        .map(e => _.pick(e, ["board_id", "title"]))
        .value();

      data.forEach(item => {
        const pin = _.pick(item, ["pin_id", "url"]);
        const board = boards.find(d => d.board_id === item.board_id);
        if (!board.pins) {
          board.pins = [];
        }
        board.pins.push(pin);
      });

      res.status(200).json({
        status: "success",
        board: boards[0],
        message: "Received all Pins in a Board"
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
  getABoardWithPins,
  deleteABoard,
  editeABoard
};
