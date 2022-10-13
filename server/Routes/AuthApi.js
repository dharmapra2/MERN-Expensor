import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/UserModal.js";
const router = Router();

router.post("/register", async (req, res) => {
  /* Inserting our requested data into the collection of User */
  const { user_email, user_name, user_pwd } = req?.body;
  if (!(user_email && user_name && user_pwd)) {
    console.log(user_email, user_name, user_pwd);
    return res.status(400).send({ error: "Data not formatted properly" });
  }

  try {
    const isAlreadyRegister = await User.findOne({ user_email });
    // console.log(isAlreadyRegister);
    if (isAlreadyRegister) {
      res.status(406).json({ warning: "User already exists" });
      return;
    }

    const user = new User({ user_name, user_email, user_pwd });
    /* encrypting the password using bcrypt */
    const salt = await bcrypt.genSalt(14);
    // now we set user password to hashed password
    user.user_pwd = await bcrypt.hash(user_pwd, salt);
    user
      .save()
      .then((doc) => res.status(201).json({ message: "User is created" }));
    console.log(user);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: "Registration Failed", error });
  }
});

router.patch("/login", async (req, res) => {
  const { user_email, user_pwd } = req.body;
  const user = await User.findOne({ user_email: user_email });
  if (user) {
    /* creatig an authontication token by JWT */
    const token = jwt.sign({}, "Dharma");
    console.log(token);

    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compareSync(user_pwd, user.user_pwd);
    if (validPassword) {
      res.status(200).json({ message: "Login successfully", token });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});

export default router;
