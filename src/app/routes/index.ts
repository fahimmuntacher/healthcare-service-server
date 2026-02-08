import { Router } from "express";
import { specialityRouter } from "../modules/speciality/speciality.routes";

const router = Router();

router.use("/specialities", specialityRouter)

export const IndexRoutes = router;