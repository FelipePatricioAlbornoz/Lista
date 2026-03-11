const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/usersController");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/", getAll);
router.get("/:id", getById);
//router.put("/:id", verifyToken, update);
//router.delete("/:id", verifyToken, verifyAdmin, remove);

module.exports = router;
