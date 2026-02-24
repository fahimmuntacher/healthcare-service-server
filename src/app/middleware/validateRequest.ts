// import { NextFunction, Request, Response } from "express";
// import z from "zod";

// export const validateRequest = (ZodSchema: z.ZodObject) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     console.log("Before parsed", req.body.data);
//     if (req.body.data) {
//       req.body = JSON.parse(req.body.data);
//     }
//     const parsedResult = ZodSchema.safeParse(req.body);
//     if (!parsedResult.success) {
//       next(parsedResult.error);
//     }

//     // sanitize the data
//     req.body = parsedResult.data;
//     console.log("After parsed", req.body);
//     next();
//   };
// };

import { NextFunction, Request, Response } from "express";
import z from "zod";


export const validateRequest = (schema: z.ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Handle stringified data from form-data (multer)
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      // 2. Wrap req.body in an object so schema.parse({ body: ... }) works
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      // 3. Replace req.body with the sanitized/parsed version from Zod
      req.body = parsed.body;

      return next(); // Use 'return' to stop execution here
    } catch (error) {
      return next(error); // Stop and jump to Global Error Handler
    }
  };
};