import { Router } from "express";
import { DoctorController } from "./doctor.controller";

import { validateRequest } from "../../middleware/validateRequest";
import { updateDoctorZodSchema } from "./doctor.validation";

const router = Router();
router.get("/", DoctorController.getAllDoctor);
router.get(
  "/:id",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorController.getDoctorById,
);
router.patch(
  "/:id",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateDoctorZodSchema),
  DoctorController.updateDoctor,
);
router.delete(
  "/:id",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorController.deleteDoctor,
);
export const DoctorRoutes = router;
