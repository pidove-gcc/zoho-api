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
exports.LoadToken = void 0;
// const fs = require("fs").promises;
// const path = require("path");
// const process = require("process");
const axios_1 = __importDefault(require("axios"));
const fs = require("fs");
function LoadToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default
                .post("https://accounts.zoho.com/oauth/v2/token", null, {
                params: {
                    refresh_token: "1000.38a7ac8a3fcbb635bd20070e3a5812b9.1277fa1e6fea39c5361d4e06768efb10",
                    client_id: "1000.WQ45NH1UWVVQHYW6B4Y9N96XUY91IT",
                    client_secret: "3c7a89a7b9a49500f71794c217c14c2e4e19f4f602",
                    grant_type: "refresh_token",
                },
            })
                .then((response) => {
                console.log(response.data);
                console.log("Se hizo la consulta con exito");
                let datos = JSON.stringify(response.data, null);
                fs.writeFileSync("token.json", datos);
            })
                .catch((error) => {
                console.log(error);
            });
        }
        catch (error) {
            console.log("error: ", error);
        }
    });
}
exports.LoadToken = LoadToken;
//# sourceMappingURL=zoho.js.map