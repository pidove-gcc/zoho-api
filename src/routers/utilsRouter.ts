import { Router } from "express";
import {
  getAvailableHours,
  createCalendarEvent,
  createCrmContact,
} from "../services/utilServices";

const utilRouter = Router();

utilRouter.post("/createcontact",createCrmContact);
utilRouter.post("/calendar/create", createCalendarEvent);
utilRouter.post("/calendar", getAvailableHours);

export { utilRouter };
