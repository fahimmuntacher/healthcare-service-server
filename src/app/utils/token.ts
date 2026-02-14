import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import { envVars } from "../config/env";
import { cookieUtils } from "./cookie";

import type { Response as ExpressResponse } from "express";

// creating
const getAccessToken = (payload: JwtPayload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    {
      expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN,
    } as SignOptions,
  );
  return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN } as SignOptions,
  );
  return refreshToken;
};

const setAccessTokenCookie = (
  res: ExpressResponse<any, Record<string, any>>,
  token: string,
) => {
  // const maxAge = ms(envVars.ACCESS_TOKEN_EXPIRES_IN as any) as unknown as number;

  cookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    // 1 day
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const setRefreshTokenCookie = (
  res: ExpressResponse<any, Record<string, any>>,
  token: string,
) => {
  cookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
};

const setBetterAuthCookie = (
  res: ExpressResponse<any, Record<string, any>>,
  token: string,
) => {
  cookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 60 * 24, // 1 day in seconds
  });
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthCookie,
};
