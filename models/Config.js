const mongoose = require("mongoose");
const ConfigSchema = new mongoose.Schema(
  {
    _id: String,
    value: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Config = mongoose.model("Config", ConfigSchema);
module.exports = Config;
