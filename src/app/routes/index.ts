import { Router } from "express";
import { specialityRouter } from "../modules/speciality/speciality.routes";
import { authRotuer } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";

const router = Router();

router.use("/specialities", specialityRouter)
router.use("/auth", authRotuer)
router.use("/users", UserRoutes)

export const IndexRoutes = router;