const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    evm_address: String,
    primaryNetwork: String,
    primaryToken: {
      type: String,
      enum: ["BUSD", "USDT", "USDC"],
    },
    balance: [],
    Transactions: [],
    poolHistory: [],
    authID: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
