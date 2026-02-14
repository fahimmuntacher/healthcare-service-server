import status from "http-status";
import { UserStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

// user register service
const registerUser = async (payload: IRegisterPatientPayload) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!data.user) {
    // throw new Error("Failed to register user");
    throw new AppError("Failed to register user", status.INTERNAL_SERVER_ERROR);
  }

  //  transaction user into patient after successful registration

  const patient = await prisma.$transaction(async (tx) => {
    try {
      const patientTx = await tx.patient.create({
        data: {
          userId: data.user.id,
          name: payload.name,
          email: payload.email,
        },
      });
      return patientTx;
    } catch (error) {
      console.log(error);
      await prisma.user.delete({
        where: {
          id: data.user.id,
        },
      });
      throw error;
    }
  });

  return {
    ...data,
    patient,
  };
};

// user sign in service
const loginUser = async (payload: IRegisterPatientPayload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!data.user.emailVerified) {
    // throw new Error("Please verify your email");
    throw new AppError("Please verify your email", status.BAD_REQUEST);
  }

  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    throw new AppError("User is deleted", status.FORBIDDEN);
  }

  if (data.user.status === UserStatus.BLOCKED) {
    throw new AppError("User is blocked", status.FORBIDDEN);
  }

  const accessToke = tokenUtils.getAccessToken({
    userId: data.user.id,
    email: data.user.email,
    role: data.user.role,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  });

  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    email: data.user.email,
    role: data.user.role,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified,
  });

  return {
    accessToke,
    refreshToken,
    ...data,
  };
};

export const authService = {
  registerUser,
  loginUser,
};
