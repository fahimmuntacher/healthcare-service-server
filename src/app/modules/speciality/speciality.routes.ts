import { Router } from "express";
import { specialityController } from "./speciality.controller";

const router = Router()

router.post("/", specialityController.createSpeciality);
router.get("/", specialityController.getSpecialities);
router.delete("/:id", specialityController.deleteSpecialities);
router.put("/:id", specialityController.updateSpeciality);
export const specialityRouter = router;