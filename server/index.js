import express from "express";
import mongoose from "mongoose";
import cors from "cors";
/* declearing port */
const PORT = 4000;
const app = express();

/* use cors to prevent client side error */
app.use(cors());

/* connecting to mongodb */
await mongoose.connect(
  `mongodb+srv://dharmapradhan2:SN9n2JyX0R@cluster0.qmwycxu.mongodb.net/?retryWrites=true&w=majority`
);
console.log("MongoDb is connected succesfully");

app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/transaction", (req, res) => {
  res.send("hello world");
});
app.listen(PORT, () => {
  console.log("port is running");
});
