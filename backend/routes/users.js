var express = require("express");
var router = express.Router();
const {
  getAllusers,
  createUser,
  getSingleUser,
  getPinsForAuser,
  getBoardsAndPinsForAuser,
  updateAUser,
  deleteAUser
} = require("../db/queries/usersQueries.js");
/* GET users listing. */
router.get("/", getAllusers);
router.get("/:id", getSingleUser);
router.post("/", createUser);
router.get("/:id/pins", getPinsForAuser);
router.get("/:id/boards", getBoardsAndPinsForAuser);
router.patch("/:id", updateAUser);
router.delete("/:id", deleteAUser);

module.exports = router;
