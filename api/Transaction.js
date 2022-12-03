const router = require("express").Router();

const {
  createTransaction,
  getAllTransaction,
} = require("../controllers/Transaction");

const { isLoggedIn } = require("./../controllers/Auth");

router.get("/", isLoggedIn, getAllTransaction);
router.post("/", isLoggedIn, createTransaction);

module.exports = router;
