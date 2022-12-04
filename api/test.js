const router = require("express").Router();

const { isLoggedIn } = require("./../controllers/Auth");
const { get } = require("./../controllers/Config");

router.get("/node_env", (req, res) => {
  res.send(process.env.NODE_ENV);
});

router.get("/conf/:key", async (req, res) => {
  const { key } = req.query;
  let value = await get(key);
  if (value !== null || value !== undefined) value = "Key doesn't  exist";
  res.status(200).json({ status: "OK", value });
});

router.get("/isLoggedIn", isLoggedIn, (req, res) => {
  res.send("LoggedIn");
});

module.exports = router;
