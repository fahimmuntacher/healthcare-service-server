import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { bearer } from "better-auth/plugins";

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

  advanced: {
    cookiePrefix: "better-auth",
  },

  plugins : [
    bearer()
  ],

  session: {
    expiresIn: 24 * 60 * 60, // 1 day in ms

    updateAge: 24 * 60 * 60, // 1 day in ms
    cookieCache: {
      enabled: true,
      maxAge: 24 * 60 * 60, // 1 day in milliseconds
    },
  },
});
