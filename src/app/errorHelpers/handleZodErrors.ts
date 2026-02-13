import status from "http-status";
import z from "zod";
import { TErrorRes, TErrorSources } from "../interfaces/error.interfaces";

export const handleZodErrors = (err: z.ZodError) : TErrorRes=> {
  const statusCode = status.BAD_REQUEST;
 const message = "Zod Validation error";
 const errorSource : TErrorSources[] = [];
  err.issues.forEach((issue) => {
    errorSource.push({
      path:
        issue.path.length > 1
          ? issue.path.join(" => ")
          : (issue.path[0] as string),
      message: issue.message,
    });
  });

    return {
    success : false,
    statusCode,
    message,
    
    errorSource
    }
};
