const catchAsync = require("../lib/catchAsync");
const Config = require("./../models/Config");

exports.get = async (key) => {
  const config = await Config.findById(key);
  if (!config) return null;
  return config.value;
};

exports.set = async (key, value) => {
  let config = await Config.findById(key);
  if (!config) {
    config = new Config();
    config._id = key;
    config.value = value;
  }
  config.value = value;
  await config.save();
  return { key: config.key, value: config.value };
};

exports.del = async (key) => {
  await Config.findByIdAndDelete(key);
};

// exports.getItem = catchAsync(async (req, res) => {
//   const { key } = req.body;
//   const value = await this.get(key);
//   res.status(200).json({ status: "success", data: value });
// });

// exports.setItem = catchAsync(async (req, res) => {
//   const { key, value } = req.body;
//   const result = await this.set(key, value);
//   res.status(200).json({
//     status: "success",
//     data: result,
//   });
// });
