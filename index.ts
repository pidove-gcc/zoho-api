import express, {Request,Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
import { exit } from "process";
import { zohoRouter } from "./src/routers";
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
app.use("/zoho",zohoRouter)

//other middleware 


app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel')
})


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

