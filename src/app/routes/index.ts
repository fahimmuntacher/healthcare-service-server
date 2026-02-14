import { Router } from "express";
import { specialityRouter } from "../modules/speciality/speciality.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { DoctorRoutes } from "../modules/doctor/doctor.routes";
import { authRotuer } from "../modules/auth/auth.routes";

const router = Router();

router.use("/specialities", specialityRouter)
router.use("/auth", authRotuer)
router.use("/users", UserRoutes)
router.use("/doctors", DoctorRoutes)

export const IndexRoutes = router;