"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = require("express");
const services_1 = require("../services");
const testRouter = (0, express_1.Router)();
exports.testRouter = testRouter;
testRouter.get("", services_1.testEndpoint);
