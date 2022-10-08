import mongoose from "mongoose";
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  amount: Number,
  description: String,
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default new mongoose.model("Transaction", TransactionSchema);
