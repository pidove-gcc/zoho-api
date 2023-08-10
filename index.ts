import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { exit } from "process";
import { userRouter, utilRouter, zohoRouter } from "./src/routers";
import {getzohotoken} from "./src/services";
import nodeCron from "node-cron";
import { LoadToken } from "./src/helpers";

//env config
dotenv.config();

//variables for server and db
const PORT = process.env.PORT;
const URL_CONNECTION = process.env.MONGO_URL as string;

//server
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//endpoints
app.use("/user", userRouter);
app.use("/utils", utilRouter);
app.use("/zoho",zohoRouter)

//other middleware 

//server initialization function
const startServer = async () => {
  try {
    // mongoose.set("strictQuery", true);
    nodeCron.schedule('59 * * * *', () => {
      LoadToken()
    })
    // await mongoose.connect(URL_CONNECTION);
    app.listen(PORT, () => {
      console.log(`[SERVER]: server is running on port: ${PORT}`);
    
    });
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

//server initialization
startServer();
