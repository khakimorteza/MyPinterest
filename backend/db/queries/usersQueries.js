const { db } = require("./connection.js");
const _ = require("lodash");
const authHelpers = require("../../auth/helpers");

const getAllusers = (req, res, next) => {
  db.any("SELECT * FROM users")
    .then(users => {
      res.status(200).json({
        status: "success",
        users: users,
        message: "Received all USERS!"
      });
    })
    .catch(err => next(err));
};

const createUser = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password);
  db.none(
    "INSERT INTO users(username, email, password_digest) VALUES(${username}, ${email}, ${password})",
    { username: req.body.username, email: req.body.email, password: hash }
  )
    .then(() => {
      console.log("USER CREATED !!!!!!");
      res.status(200).json({
        status: "success",
        message: "NEW USER ADDED!"
      });
    })
    .catch(err => next(err));
};

const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).send("log out success");
};

const loginUser = (req, res) => {
  res.json(req.user);
};

const isLoggedIn = (req, res) => {
  if (req.user) {
    db.one("SELECT id, username, email FROM users WHERE username=$1", [
      req.user
    ]).then(user => {
      res.status(200).json({
        status: "success",
        user: user,
        message: "Received ONE USER!"
      });
    });
    // res.status(200).json({});
  } else {
    res.json({ username: null });
  }
};

const getSingleUser = (req, res, next) => {
  let user_id = parseInt(req.params.id);
  db.one("SELECT * FROM users WHERE id=$1", [user_id])
    .then(user => {
      res.status(200).json({
        status: "success",
        user: user,
        message: "Received ONE USER!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getPinsForAuser = (req, res, next) => {
  let user_id = parseInt(req.params.id);
  db.any(
    "SELECT pins.* FROM users JOIN pins ON pins.user_id = users.id WHERE users.id =$1",
    [user_id]
  )
    .then(pins => {
      res.status(200).json({
        status: "success",
        pins: pins,
        message: "Received all Pins For a USER"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getBoardsAndPinsForAuser = (req, res, next) => {
  let user_id = parseInt(req.params.id);
  db.any(
    "SELECT users.username, boards.title, pins.url, pins.id AS pin_id, boards.id AS board_id FROM users JOIN boards ON boards.user_id = users.id LEFT JOIN pins ON boards.id = pins.board_id  WHERE users.id =$1",
    [user_id]
  )
    .then(data => {
      // const user = _(data)
      //   .uniqBy("username")
      //   .map(d => _.pick(d, ["username"]))
      //   .value();

      const boards = _(data)
        .uniqBy("board_id")
        .map(e => _.pick(e, ["board_id", "title"]))
        .value();

      // const unique = _.uniqBy(data, 'board_id')
      // const boards = _.map(unique, e => _.pick(e, ["board_id", "title"]))
      // const boards = unique.map(e, e => _.pick(e, ["board_id", "title"]))

      // [{board_id:1 , title: "aaa"}, {board_id:2 , title: "bbb"}]

      // user.boards = boards;
      data.forEach(item => {
        const pin = _.pick(item, ["pin_id", "url"]);
        // {pin_id: 1, url: "aaaaa" }
        const board = boards.find(b => b.board_id === item.board_id);
        if (!board.pins) {
          board.pins = [];
        }
        board.pins.push(pin);
      });

      res.status(200).json({
        status: "success",
        boards: boards,
        message: "Received all Pins For a USER"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const updateAUser = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  db.none(
    "UPDATE users SET " + queryString + " WHERE id=" + req.params.id,
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Updated a User!"
      });
    })
    .catch(err => next(err));
};

const deleteAUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  db.result("DELETE FROM users WHERE id=$1", userId)
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "You Delete a User",
        result: result
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllusers,
  createUser,
  logoutUser,
  loginUser,
  isLoggedIn,
  getSingleUser,
  getPinsForAuser,
  getBoardsAndPinsForAuser,
  updateAUser,
  deleteAUser
};
