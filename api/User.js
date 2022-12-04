const router = require("express").Router();

const { isVpaAvailable, updateUser } = require("./../controllers/User");
const { isLoggedIn } = require("./../controllers/Auth");
const { getUserTransactions } = require("./../controllers/Transaction");

router.get("/vpa/:vpa", isVpaAvailable);
router.patch("/me", isLoggedIn, updateUser);
router.get("/me/transfers", isLoggedIn, getUserTransactions);
router.get("/me/poolHistory", isLoggedIn, );
module.exports = router;
