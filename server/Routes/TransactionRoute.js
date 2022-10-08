import { Router } from "express";
import Transaction from "../Models/TransactionModal.js";
const router = Router();

router.post("/", (req, res) => {
  const { amount, details: description, date } = req.body;
  /* Inserting our requested data into the collection of Transaction */
  try {
    const transaction = new Transaction({
      amount,
      description,
      date,
    });
    transaction.save();
    console.log(transaction);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
});

router.get("/", async (req, res) => {
  /* fetching data from the collection of Transaction */
  const transaction = await Transaction.find({}).sort({ createdAt: -1 });
  // console.log(transaction);
  res.json({ transaction });
});

export default router;
