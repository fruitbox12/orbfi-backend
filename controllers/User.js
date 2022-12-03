const catchAsync = require("../lib/catchAsync");
const User = require("../models/User");
const AppError = require("../lib/AppError");

exports.isVpaAvailable = catchAsync(async (req, res, next) => {
  const { vpa } = req.params;
  const vpaUser = await User.findOne({ vpa });
  if (vpaUser) return next(new AppError("VPA Unavailable", 409));
  res.status(200).json({ status: "success", data: true });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  if (!user) return next(new AppError("User Doesn't Exist", 404));
  res.status(200).json({ status: "success", data: { user } });
});
