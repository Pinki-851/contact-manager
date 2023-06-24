const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  createContact,
} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// for token check
router.use(validateToken);

router.route("/").get(getContacts);

router.route("/").post(createContact);
router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
