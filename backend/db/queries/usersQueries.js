const { db } = require("./connection.js");

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
  db.none(
    "INSERT INTO users(username, email) VALUES(${username}, ${email})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "NEW USER ADDED!"
      });
    })
    .catch(err => next(err));
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

const getBoardsForAuser = (req, res, next) => {
  let user_id = parseInt(req.params.id);
  db.any(
    "SELECT boards.* FROM users JOIN boards ON boards.user_id = users.id WHERE users.id =$1",
    [user_id]
  )
    .then(boards => {
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
  getSingleUser,
  getPinsForAuser,
  getBoardsForAuser,
  updateAUser,
  deleteAUser
};
