import { NextFunction, Request, Response } from "express";
import { Errors } from "../data/errors";
import { IDTOUser, IError } from "../interfaces";
import { DaoUser } from "../models/User";

export const saveUserData = async (
  req: Request<{}, {}, IDTOUser>,
  res: Response,
  next: NextFunction
) => {
  console.log("body in create user: ", req.body);
  const { email, name, phone } = req.body;
  try {
    const result = await DaoUser.create({ email, name, phone });
    // if (result) return res.status(201).send();
    if (result) return next();
    return res
      .status(400)
      .json({ errorMessage: Errors.user.US1, errorType: "US1" } as IError);
  } catch (error) {
    console.log("error saving user contact data: ", error);
    res.status(400).json({ error });
  }
};
