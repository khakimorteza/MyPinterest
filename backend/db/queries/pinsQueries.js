const { db } = require("./connection.js");

const getAllPins = (req, res, next) => {
  db.any("SELECT * FROM pins")
    .then(pins => {
      res.status(200).json({
        status: "success",
        images: pins,
        message: "Received All Pins"
      });
    })
    .catch(err => next(err));
};

const getSinglePin = (req, res, next) => {
  let pinId = parseInt(req.params.id);
  db.one("SELECT * FROM pins WHERE id=$1", [pinId])
    .then(pin => {
      res.status(200).json({
        status: "success",
        image: pin,
        message: "Received ONE PIN!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const createNewPin = (req, res, next) => {
  db.none(
    "INSERT INTO pins(user_id, board_id, url) VALUES (${user_id},${board_id}, ${url})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "YOU ADD A PIN"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteAPin = (req, res, next) => {
  let pinId = parseInt(req.params.id);
  db.result("DELETE FROM pins WHERE id=$1", pinId)
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "YOU DELETE A PIN!"
      });
    })
    .catch(err => next(err));
};

module.exports = {
  getAllPins,
  getSinglePin,
  createNewPin,
  deleteAPin
};
