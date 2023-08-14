"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilRouter = void 0;
const express_1 = require("express");
const utilServices_1 = require("../services/utilServices");
const utilRouter = (0, express_1.Router)();
exports.utilRouter = utilRouter;
utilRouter.post("/createcontact", utilServices_1.createCrmContact);
utilRouter.post("/calendar/create", utilServices_1.createCalendarEvent);
utilRouter.post("/calendar", utilServices_1.getAvailableHours);
//# sourceMappingURL=utilsRouter.js.map