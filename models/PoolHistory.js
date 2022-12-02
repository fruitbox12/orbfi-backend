const mongoose = require("mongoose");

const poolHistorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["deposit", "withdraw"],
      required: [true, "Enter Type of Transaction"],
    },
    from: String,
    token: String,
    amount: String,
    fee: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const PoolHistory = mongoose.model("PoolHistory", poolHistorySchema);
module.exports = PoolHistory;
