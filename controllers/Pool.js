const Pool = require("./../models/PoolHistory");

exports.getUserPoolHistory = catchAsync(async (req, res, next) => {
  const poolHistory = await Pool.find({ from: req.user.evm_address });
  res.status(200).json({
    status: "success",
    length: poolHistory.length,
    data: poolHistory,
  });
});
