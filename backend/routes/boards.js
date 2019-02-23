var express = require("express");
var router = express.Router();

const {
  getAllBoards,
  getSingleBoard,
  createABoard,
  getPinsForABoard,
  deleteABoard,
  editeABoard
} = require("../db/queries/boardsQueries.js");

router.get("/", getAllBoards);
router.get("/:id", getSingleBoard);
router.post("/", createABoard);
router.get("/:id/pins", getPinsForABoard);
router.delete("/:id", deleteABoard);
router.patch("/:id", editeABoard);

module.exports = router;
