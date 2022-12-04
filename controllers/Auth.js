const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { ethers } = require("ethers");

const User = require("../models/User");

const { set, get, del } = require("./../controllers/Config");

const createJWT = require("../lib/createJwt");
const catchAsync = require("../lib/catchAsync");
const AppError = require("../lib/AppError");

dotenv.config();

/**
 * Middlewares
 */
const sendJWTResponse = async (user, statusCode, res) => {
  const token = createJWT(jwt, user);
  user.password = undefined;
  user.__v = undefined;

  await set(user.evm_address, token);

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
  const nonce = Math.floor(Math.random() * 100000000);
  await set(`${address}_message`, nonce);
  res.status(200).json({ status: "OK", data: nonce });
});

exports.login = catchAsync(async (req, res, next) => {
  const { address, signature } = req.params;
  const message = await get(`${address}_message`);
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);

  await del(`${address}_message`);

  if (recoveredAddress !== address)
    return next(new AppError("Invalid User", 406));

  let user = await User.findOne({ evm_address: recoveredAddress });
  if (!user) {
    user = await User.create({
      evm_address: address,
    });

    return sendJWTResponse(user, 201, res);
  }
  sendJWTResponse(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = await jwt.verify(token, process.env.JWTSECRET);
  const userAddress = decoded.address;
  await del(userAddress);
  res.status(200).json({ status: "success", data: "Logged out" });
});
