import express from "express";
import mongoose from "mongoose";
import cors from "cors";
/* declearing port */
const PORT = 4000;
const app = express();
// const router = express.Router();

/* use cors to prevent client side error */
app.use(cors());

/* express.json() is used for add the built-in JSON body parser to properly add the "body" property to the request object. */
app.use(express.json());

/* connecting to mongodb */
// await mongoose.connect(
//   `mongodb+srv://dharmapradhan2:SN9n2JyX0R@cluster0.qmwycxu.mongodb.net/?retryWrites=true&w=majority`
// );
// console.log("MongoDb is connected succesfully");

app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/transaction", (req, res) => {
  console.log(req.body);
  res.send("f");
});
app.listen(PORT, () => {
  console.log("port is running");
});
