const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { ethers } = require("ethers");

const User = require("../models/User");
const createJWT = require("./../lib/createJwt");
const catchAsync = require("./../lib/catchAsync");
const AppError = require("./../lib/AppError");

const { inDB } = require("./../lib/localCache");

dotenv.config();

/**
 * Middlewares
 */
const sendJWTResponse = (user, statusCode, res) => {
  const token = createJWT(jwt, user);
  user.password = undefined;
  user.__v = undefined;

  inDB.set(user.evm_address, token);

  res.status(statusCode).json({
    status: "success",
    data: { token, user },
  });
};

exports.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(new AppError("you are not logged in to perform this action", 401));
  }
};

exports.restrictTo = (...usertype) => {
  return (req, res, next) => {
    if (typeof req.user === "undefined") {
      return next(new AppError("you are not logged in", 400));
    } else if (!usertype.includes(req.user.userType)) {
      return next(
        new AppError("you are Authorised to perform this action", 401)
      );
    }
    next();
  };
};

/**
 * Controllers
 */
exports.seralizeUser = catchAsync(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWTSECRET);
      const user = await User.findById(decoded.id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      return next();
    }
  } else {
    req.user = null;
    next();
  }
});

exports.generateUMessage = catchAsync(async (req, res) => {
  const { address } = req.params;
  const nonce = Math.floor(Math.random() * 1000000);
  const message = `Orb.fi server request you to verify the message:
    address: ${address}
    nonce: ${nonce}
  `;
  inDB.set(`${address}_message`, message);
  res.status(200).json({ status: "OK", data: message });
});

exports.login = catchAsync(async (req, res, next) => {
  const { address, signature } = req.params;
  const message = inDB.get(`${address}_message`);
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);

  inDB.delete(`${address}_message`);

  if (recoveredAddress !== address)
    return next(new AppError("Invalid User", 406));

  const user = await User.findOne({ evm_address: recoveredAddress });

  sendJWTResponse(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = await jwt.verify(token, process.env.JWTSECRET);
  const userAddress = decoded.address;
  inDB.delete(userAddress);
});
