import { Router } from "express";
import { specialityRouter } from "../modules/speciality/speciality.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { DoctorRoutes } from "../modules/doctor/doctor.routes";
import { authRotuer } from "../modules/auth/auth.routes";
import { scheduleRoutes } from "../modules/schedule/schedule.routes";
import { DoctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.routes";

const router = Router();

router.use("/specialities", specialityRouter);
router.use("/auth", authRotuer);
router.use("/users", UserRoutes);
router.use("/doctors", DoctorRoutes);
router.use("/schedules", scheduleRoutes);
router.use("/doctor-schedules", DoctorScheduleRoutes);

export const IndexRoutes = router;
