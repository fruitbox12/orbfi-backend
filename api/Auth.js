const router = require("express").Router();

const { generateUMessage, login, logout } = require("./../controllers/Auth");

router.get("/login/getMessage/:address", generateUMessage);
router.post("/login/:address/:signature", login);
router.get("/logout", logout);

module.exports = router;
