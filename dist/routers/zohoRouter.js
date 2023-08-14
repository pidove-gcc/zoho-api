"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zohoRouter = void 0;
const express_1 = require("express");
const services_1 = require("../services");
const zohoRouter = (0, express_1.Router)();
exports.zohoRouter = zohoRouter;
zohoRouter.get("/genretoken", services_1.getzohotoken);
zohoRouter.post("/gethours", services_1.getbookinghour);
zohoRouter.post("/info", services_1.getservice);
zohoRouter.post("/getstaff", services_1.getstaff);
zohoRouter.post("/getbook", services_1.getbook);
zohoRouter.post("/saveconvert", services_1.saveConvertion);
zohoRouter.post("/booking", services_1.book);
//# sourceMappingURL=zohoRouter.js.map