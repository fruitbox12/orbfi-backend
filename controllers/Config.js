const catchAsync = require("../lib/catchAsync");
const Config = require("./../models/Config");

const get = async (key) => {
  const config = await Config.findOne({ key });
  if (!config) return null;
  return config.value;
};

const set = async (key, value) => {
  const config = await Config.findOneAndUpdate(
    { key },
    { value },
    { new: true }
  );
  return { key: config.key, value: config.value };
};

const create = async (key, value) => {
  const config = await Config.create({ key, value });
  return { key: config.key, value: config.value };
};

const del = async (key) => {
  await Config.findOneAndDelete({ key });
};

exports.getItem = catchAsync(async (req, res) => {
  const { key } = req.body;
  const config = await Config.findOne({ key });
  res.status(200).json({ status: "success", data: config.value });
});

exports.setItem = catchAsync(async (req, res) => {
  const { key, value } = req.body;
  const config = await Config.findOneAndUpdate(
    { key },
    { value },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: { key: config.key, value: config.value },
  });
});

exports.createItem = catchAsync(async (req, res) => {
  const { key, value } = req.body;
  const config = await Config.create({ key, value });
  res.status(200).json({
    status: "success",
    data: { key: config.key, value: config.value },
  });
});

module.exports = { get, set, create, del };
