const mongoose = require("mongoose");

const poolSchema = new mongoose.Schema(
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
    txHash: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Pool = mongoose.model("Pool", poolSchema);
module.exports = Pool;
