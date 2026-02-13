import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateRequest = (ZodSchema: z.ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Before parsed", req.body);
    const parsedResult = ZodSchema.safeParse(req.body);
    if (!parsedResult.success) {
      next(parsedResult.error);
    }

    // sanitize the data
    req.body = parsedResult.data;
    console.log("After parsed", req.body);
    // next();
  };
};