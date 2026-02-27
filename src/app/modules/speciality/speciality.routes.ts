import { Router } from "express";
import { specialityController } from "./speciality.controller";

import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middleware/validateRequest";
import { createSpecialtyZodSchema } from "./speciality.validation";


const router = Router();

router.post(
  "/",
  // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(createSpecialtyZodSchema),
  specialityController.createSpeciality,
);
router.get(
  "/",
  // checkAuth(Role.ADMIN, Role.DOCTOR, Role.PATIENT),
  specialityController.getSpecialities,
);
router.delete("/:id", specialityController.deleteSpecialities);
router.put("/:id", specialityController.updateSpeciality);
export const specialityRouter = router;
