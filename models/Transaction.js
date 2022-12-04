const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    id: String,
    from: String,
    to: String,
    fromNetwork: String,
    toNetwork: String,
    fromToken: String,
    toToken: String,
    fromTx: String,
    toTx: String,
    fromfee: String,
    toFee: String,
    platformfee: String,
    amount: {
      type: String,
      required: [true, "Amount Required"],
    },
    type: {
      type: String,
      enum: ["zap", "wallet"],
      required: [true, "Enter a type of transaction"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
