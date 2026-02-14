import status from "http-status";
import { Role, Speciality } from "../../../generated/prisma/client";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctor } from "./user.interface";

const createDoctor = async (payload: ICreateDoctor) => {
  const specialities: Speciality[] = [];
  for (const specialityId of payload.specialities) {
    const speciality = await prisma.speciality.findUnique({
      where: {
        id: specialityId,
      },
    });
    if (!speciality) {
      throw new AppError(`Speciality with id ${specialityId} not found`, status.BAD_REQUEST);
    }
    specialities.push(speciality);
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email,
    },
  });

  if (userExist) {
    throw new AppError("User with this email already exists", status.BAD_REQUEST);
  }

  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.doctor.email,
      password: payload.password,
      role: Role.DOCTOR,
      name: payload.doctor.name,
      needPasswordChange: true,
    },
  });

  try {
    const doctorTransaction = await prisma.$transaction(async (tx) => {
      const doctorData = await tx.doctor.create({
        data: {
          userId: userData.user.id,
          ...payload.doctor,
        },
      });

      const doctorSpecialityData = specialities.map((speciality) => {
        return {
          doctorId: doctorData.id,
          specialityId: speciality.id,
        };
      });
      await tx.doctorSpeciality.createMany({
        data: doctorSpecialityData,
      });

      const doctor = await tx.doctor.findUnique({
        where: {
          id: doctorData.id,
        },
        select: {
          id: true,
          userId: true,
          name: true,
          email: true,
          profilePhoto: true,
          phoneNumber: true,
          address: true,
          registrationNumber: true,
          experience: true,
          gender: true,
          appintementFee: true,
          qualification: true,
          currentWorkingPlace: true,
          designation: true,
          createdAt: true,
          isDeleted: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              emailVerified: true,
              status: true,
              image: true,
              isDeleted: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          specialities: {
            select: {
              speciality: {
                select: {
                  title: true,
                  id: true,
                },
              },
            },
          },
        },
      });
      return doctor
    });

    return doctorTransaction;
  } catch (error) {
    console.log("Create doctor transaction error", error);
    await prisma.user.delete({
      where: {
        id: userData.user.id,
      },
    });
  }
};


export const userService = {
    createDoctor
}