import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

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
    throw new Error("Failed to register user");
  }

  //TODO : Create patient after sign up as an user

  // const patient = await prisma.$transaction(async (tx) => {

  //     await tx.
  // })

  return data;
};

const loginUser = async (payload: IRegisterPatientPayload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!data.user.emailVerified) {
    throw new Error("Please verify your email");
  }

  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    throw new Error("User is deleted");
  }

  if (data.user.status === UserStatus.BLOCKED) {
    throw new Error("User is blocked");
  }

  return data;
};

export const authService = {
  registerUser,
  loginUser,
};
