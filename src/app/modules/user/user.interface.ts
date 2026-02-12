import { Gender } from "../../../generated/prisma/enums";

export interface ICreateDoctor {
  password: string;
  doctor: {
    name: string;
    email: string;
    registrationNumber: string;
    experience: number;
    gender: Gender;
    appintementFee: number;
    qualification?: string;
    currentWorkingPlace?: string;
    designation?: string;
    profilePhoto?: string;
    needPasswordChange?: boolean;
    phoneNumber?: string;
    address?: string;
  };
  specialities: string[];
}
