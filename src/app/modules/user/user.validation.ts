import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZod = z.object({
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
  doctor: z.object({
    name: z
      .string("Name is required")
      .min(5, "Name must be at least 5 characters long")
      .max(50, "Name must be at most 50 characters long"),
    email: z.email("Invalid email address"),
    phoneNumber: z
      .string("Phone number is required")
      .max(11, "Phone number must be at most 11 characters long"),
    address: z
      .string("Address is required")
      .max(100, "Address must be at most 100 characters long"),
    registrationNumber: z
      .string("Registration number is required")
      .max(20, "Registration number must be at most 20 characters long"),
    experience: z.number("Experience is required"),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appintementFee: z.number("Appintement fee is required"),
    qualification: z
      .string("Qualification is required")
      .max(100, "Qualification must be at most 100 characters long"),
    currentWorkingPlace: z
      .string("Current working place is required")
      .max(100, "Current working place must be at most 100 characters long"),
    designation: z
      .string("Designation is required")
      .max(100, "Designation must be at most 100 characters long"),
  }),

  specialities: z
    .array(z.uuid(), "Specialities must be an array of UUIDs")
    .min(1, "At least one speciality is required"),
});