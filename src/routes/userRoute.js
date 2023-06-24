const express = require("express");
const router = express.Router();

const {
  registerUser,
  getAllUser,
  loginUser,
  currentUser,
  deleteUser,
} = require("../controller/userController");

const validateToken = require("../middleware/validateTokenHandler");

router.route("/users").get(getAllUser);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/delete/:id").delete(deleteUser);

router.get("/current_user", validateToken, currentUser);

module.exports = router;
