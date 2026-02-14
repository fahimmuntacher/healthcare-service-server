import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";
import ms from "ms";
import { envVars } from "../config/env";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Role.PATIENT,
      },
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE,
      },

      isDeleted: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
    },
  },

  session: {
    expiresIn: Number(ms(Number(envVars.BETTER_AUTH_SESSION_EXPIRES_IN))),
    updateAge: Number(ms(Number(envVars.BETTER_AUTH_UPDATE_SESSION_AGE))),
    cookieCache: {
      enabled: true,
      maxAge: Number(ms(Number(envVars.BETTER_AUTH_SESSION_EXPIRES_IN))),
    },
  },
});
