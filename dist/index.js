"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const process_1 = require("process");
const routers_1 = require("./src/routers");
const node_cron_1 = __importDefault(require("node-cron"));
const helpers_1 = require("./src/helpers");
//env config
dotenv_1.default.config();
//variables for server and db
const PORT = process.env.PORT;
const URL_CONNECTION = process.env.MONGO_URL;
//server
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//endpoints
app.use("/user", routers_1.userRouter);
app.use("/utils", routers_1.utilRouter);
app.use("/zoho", routers_1.zohoRouter);
//other middleware 
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
//server initialization function
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // mongoose.set("strictQuery", true);
        node_cron_1.default.schedule('59 * * * *', () => {
            (0, helpers_1.LoadToken)();
        });
        // await mongoose.connect(URL_CONNECTION);
        app.listen(PORT, () => {
            console.log(`[SERVER]: server is running on port: ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        (0, process_1.exit)(1);
    }
});
//server initialization
startServer();
