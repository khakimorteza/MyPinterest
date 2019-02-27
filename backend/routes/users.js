var express = require("express");
const passport = require("passport");
const { loginRequired } = require("../auth/helpers");
var router = express.Router();
const {
  getAllusers,
  createUser,
  getSingleUser,
  getPinsForAuser,
  getBoardsAndPinsForAuser,
  updateAUser,
  deleteAUser,
  loginUser,
  isLoggedIn,
  logoutUser
} = require("../db/queries/usersQueries.js");
/* GET users listing. */
router.get("/", getAllusers);
router.get("/:id", getSingleUser);
router.post("/", createUser);
router.get("/:id/pins", getPinsForAuser);
router.get("/:id/boards", getBoardsAndPinsForAuser);
router.patch("/:id", updateAUser);
router.delete("/:id", deleteAUser);

router.post("/login", passport.authenticate("local", {}), loginUser);
router.get("/isLoggedIn", isLoggedIn);
router.post("/logout", loginRequired, logoutUser);

module.exports = router;
