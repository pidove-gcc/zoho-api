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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserData = void 0;
const errors_1 = require("../data/errors");
const User_1 = require("../models/User");
const saveUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body in create user: ", req.body);
    const { email, name, phone } = req.body;
    try {
        const result = yield User_1.DaoUser.create({ email, name, phone });
        // if (result) return res.status(201).send();
        if (result)
            return next();
        return res
            .status(400)
            .json({ errorMessage: errors_1.Errors.user.US1, errorType: "US1" });
    }
    catch (error) {
        console.log("error saving user contact data: ", error);
        res.status(400).json({ error });
    }
});
exports.saveUserData = saveUserData;
