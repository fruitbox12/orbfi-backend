const dotenv = require("dotenv");
dotenv.config();
module.exports = function (jwt, user) {
  return jwt.sign(
    { id: user.id, address: user.evm_address },
    process.env.JWTSECRET,
    {
      expiresIn: process.env.JWTEXPIRES,
    }
  );
};
