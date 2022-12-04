const router = require("express").Router();

const {
  createTransaction,
  getAllTransaction,
  updateTransaction,
} = require("../controllers/Transaction");

const { isLoggedIn } = require("./../controllers/Auth");

router.get("/", isLoggedIn, getAllTransaction);
router.post("/", isLoggedIn, createTransaction);
router.patch("/:id", isLoggedIn, updateTransaction);

module.exports = router;
