import { Router } from "express";
import { specialityRouter } from "../modules/speciality/speciality.routes";
import { authRotuer } from "../modules/auth/auth.routes";

const router = Router();

router.use("/specialities", specialityRouter)
router.use("/auth", authRotuer)

export const IndexRoutes = router;