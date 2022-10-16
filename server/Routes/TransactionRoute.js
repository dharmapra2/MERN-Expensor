import { Router } from "express";
import passport from "passport";
import Transaction from "../Models/TransactionModal.js";
const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { amount, description, date } = req.body;
    /* Inserting our requested data into the collection of Transaction */
    try {
      const transaction = new Transaction({
        amount,
        description,
        date,
      });
      await transaction.save();
      // console.log(transaction);
      res.status(201).json({ message: "Success" });
    } catch (error) {
      res.status(400).json({ message: "Failed" });
    }
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    /* fetching data from the collection of Transaction */
    const transaction = await Transaction.find({}).sort({ createdAt: -1 });
    // console.log(transaction);
    res.json({ transaction });
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    /* deleteing data from the collection of Transaction */
    try {
      const transaction = await Transaction.findOneAndDelete({
        _id: req.params?.id,
      });
      res.status(200).send("item is deleted");
    } catch (error) {
      res.status(400).send("something went wrong");
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    /* Inserting our requested data into the collection of Transaction */
    try {
      const transaction = await Transaction.updateOne(
        { _id: req.params?.id },
        { $set: req.body }
      );
      res.status(200).json({ message: "updated successfully" });
    } catch (error) {
      res.status(400).json({ message: "Failed" });
    }
  }
);

export default router;
