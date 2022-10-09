import { Router } from "express";
import User from "../Models/UserModal.js";
const router = Router();

router.post("/register", async (req, res) => {
  /* Inserting our requested data into the collection of User */
  try {
    const isAlreadyRegister = await User.find({
      user_email: req.body?.user_email,
    });
    console.log(isAlreadyRegister);
    // const register = new User(req.body);
    // await register.save();
    res.status(201).json({ message: "Registration Successfull" }, req.body);
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
