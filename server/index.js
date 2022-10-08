import express from "express";
import mongoose from "mongoose";
/* declearing port */
const PORT = 4000;
const app = express();

/* connecting to mongodb */
await mongoose.connect(
  `mongodb+srv://dharmapradhan2:SN9n2JyX0R@cluster0.qmwycxu.mongodb.net/?retryWrites=true&w=majority`
);
console.log("MongoDb is connected succesfully");

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
