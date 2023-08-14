"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const services_1 = require("../services");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("", services_1.saveUserData, services_1.createCrmContact);
userRouter.post("/meet", services_1.saveUserData, services_1.createCalendarEvent, services_1.createCrmContact);
//# sourceMappingURL=userRouter.js.map