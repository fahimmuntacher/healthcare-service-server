/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import status from "http-status";
import z from "zod";
import { TErrorSources } from "../interfaces/error.interfaces";
import { handleZodErrors } from "../errorHelpers/handleZodErrors";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.log(err);
  }

  const errorSource: TErrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal server error";
  let stack: string | undefined;

  /* [
      {
        expected: 'string',
        code: 'invalid_type',
        path: [ 'username' ],
        message: 'Invalid input: expected string'
      },
      {
        expected: 'number',
        code: 'invalid_type',
        path: [ 'xp' ],
        message: 'Invalid input: expected number'
      }
    ] */

  if (err instanceof z.ZodError) {
    const simpleZodError = handleZodErrors(err);
    statusCode = simpleZodError.statusCode;
    message = simpleZodError.message;
    errorSource.push(...simpleZodError.errorSource);
    stack = simpleZodError.stack ?? err.stack;
  } else if (err instanceof Error) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: err.message,
    errorSource,
    stack,
  });
};
