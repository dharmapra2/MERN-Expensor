import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
/* declearing port */
dotenv.config();
const PORT = process.env.APP_PORT || 4000;
const app = express();
const router = express.Router();

/* use cors to prevent client side error */
app.use(cors());

/* express.json() is used for add the built-in JSON body parser to properly add the "body" property to the request object. */
app.use(express.json());

/* connecting to mongodb */
await mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_CRIDIENTIAL}/?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDb is connected succesfully"))
  .catch((err) => console.log("connection error"));

app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/transaction", (req, res) => {
  const { amount, details, date } = req.body;
  res.send({ amount, details, date });
});

app.listen(PORT, () => {
  console.log("port is running", PORT);
});
