const mongoose = require("mongoose");
const ConfigSchema = new mongoose.Schema(
  {
    key: String,
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
