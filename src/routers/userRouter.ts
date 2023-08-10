import { Router } from "express";
import { createCalendarEvent, createCrmContact, saveUserData } from "../services";

const userRouter = Router();

userRouter.post("", saveUserData, createCrmContact);
userRouter.post("/meet", saveUserData, createCalendarEvent, createCrmContact);

export { userRouter };
