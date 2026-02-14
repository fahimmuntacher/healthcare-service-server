import { NextFunction, Request, Response } from "express";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { cookieUtils } from "../utils/cookie";
import AppError from "../errorHelpers/AppError";
import { prisma } from "../lib/prisma";
import status from "http-status";
import { jwtUtils } from "../utils/jwt";
import { envVars } from "../config/env";


export const checkAuth =
  (...authRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionToken = cookieUtils.getCookie(
        req,
        "better-auth.session_token",
      );

        
      console.log("session token", sessionToken);
      if (!sessionToken) {
        throw new AppError("Unauthorized Access! No session token found.", 401);
      }

      if (sessionToken) {
        const sessionExist = await prisma.session.findFirst({
          where: {
            token: sessionToken,
            expiresAt: {
              gt: new Date(),
            },
          },
          include: {
            user: true,
          },
        });

        if (sessionExist && sessionExist.user) {
          const user = sessionExist.user;
          const now = new Date();
          const expiresAt = new Date(sessionExist.expiresAt);
          const createdAt = new Date(sessionExist.createdAt);
          const sessionLifetime = expiresAt.getTime() - createdAt.getTime();
          const timeRemaining = expiresAt.getTime() - now.getTime();
          const parcentageRemaining = (timeRemaining / sessionLifetime) * 100;

          if (parcentageRemaining < 20) {
            res.setHeader("X-Session-Expiring", "true");
            res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
            res.setHeader("X-Session-Time-Remaining", timeRemaining.toString());

            console.log("Session expiring soon!!");
          }

          if (
            user.status === UserStatus.BLOCKED ||
            user.status === UserStatus.DELETED
          ) {
            throw new AppError(
              "Your account is blocked. Please contact support.",
              status.UNAUTHORIZED,
            );
          }

          if (user.deletedAt) {
            throw new AppError(
              "Your account is deleted. Please contact support.",
              status.UNAUTHORIZED,
            );
          }

          if (authRoles.length > 0 && !authRoles.includes(user.role as Role)) {
            throw new AppError("Forbidden access.", status.FORBIDDEN);
          }
        }

        // Check access token for API routes
        const accessToken = cookieUtils.getCookie(req, "accessToken");

        console.log("access token", accessToken);

        if (!accessToken) {
          throw new AppError("AccessToken Unauthorized", status.UNAUTHORIZED);
        }

        const verifiedToken = jwtUtils.verifyToken(
          accessToken,
          envVars.ACCESS_TOKEN_SECRET,
        );

        if (!verifiedToken.success) {
          throw new AppError("Unauthorized access token", status.UNAUTHORIZED);
        }

        if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data!.role as Role)) {
          throw new AppError("Forbidden access.", status.FORBIDDEN);
        }

        return next();
      }
    } catch (error) {
      next(error);
    }
  };
