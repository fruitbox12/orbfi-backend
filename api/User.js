const router = require("express").Router();

const { isVpaAvailable } = require("./../controllers/User");

router.get("/vpa/:vpa", isVpaAvailable);

module.exports = router;
