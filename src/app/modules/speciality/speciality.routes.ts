import { Router } from "express";
import { specialityController } from "./speciality.controller";

import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();

router.post("/", specialityController.createSpeciality);
router.get(
  "/",
  checkAuth(Role.ADMIN, Role.DOCTOR, Role.PATIENT),
  specialityController.getSpecialities,
);
router.delete("/:id", specialityController.deleteSpecialities);
router.put("/:id", specialityController.updateSpeciality);
export const specialityRouter = router;
