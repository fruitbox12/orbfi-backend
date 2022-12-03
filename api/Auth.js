const router = require("express").Router();

const { generateUMessage, login } = require("./../controllers/Auth");

router.get("/login/getMessage/:address", generateUMessage);
router.get("/login/:address/:signature", login);

module.exports = router;
