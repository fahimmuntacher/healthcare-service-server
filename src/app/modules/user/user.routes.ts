import { Router } from "express";
import { UserController } from "./user.controller";
import { ZodObject } from "zod";

import { validateRequest } from "../../middleware/validateRequest";
import { createDoctorZod } from "./user.validation";



const router = Router();



router.post(
  "/create-doctor",
  // (req: Request, res: Response, next: NextFunction) => {
  //   console.log("Before zod validation", req.body);
  //   const parsedResult = createDoctorZod.safeParse(req.body);
  //   if (!parsedResult.success) {
  //     next(parsedResult.error);
  //   }

  //   // sanitize the data
  //   req.body = parsedResult.data;
  //   console.log("After zod validation", req.body);
  //   next();
  // },

  validateRequest(createDoctorZod as ZodObject),
  UserController.createDoctor,
);
export const UserRoutes = router;
