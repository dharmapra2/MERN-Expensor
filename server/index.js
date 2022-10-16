import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectMongodb from "./Config/connection.js";
import TransactionRoute from "./Routes/TransactionRoute.js";
import AuthApi from "./Routes/AuthApi.js";
import bodyParser from "body-parser";
import passport from "passport";
import PassportConfig from "./Config/PassportConfig.js";

/* declearing port */
dotenv.config();
const PORT = process.env.APP_PORT || 4000;
const app = express();
const router = express.Router();
/* use cors to prevent client side error */
app.use(cors());

/* bodyParser.json() or express.json() is used for add the built-in JSON body parser to properly add the "body" property to the request object. */
app.use(bodyParser.json());

/* use passport for authontication middleware */
app.use(passport.initialize());
PassportConfig(passport);

/* routes */
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/transaction", TransactionRoute);
app.use("/auth", AuthApi);

/* connecting to mongodb */
await connectMongodb();

app.listen(PORT, () => {
  console.log("port is running", PORT);
});
