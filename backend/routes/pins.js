var express = require("express");
var router = express.Router();

const {
  getAllPins,
  getSinglePin,
  createNewPin,
  deleteAPin
} = require("../db/queries/pinsQueries.js");

router.get("/", getAllPins);
router.get("/:id", getSinglePin);
router.post("/", createNewPin);
router.delete("/:id", deleteAPin);

module.exports = router;
