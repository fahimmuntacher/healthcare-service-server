import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import { envVars } from "../config/env";
import { cookieUtils } from "./cookie";
import ms from "ms";
import { Response } from "express";

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

const setAccessTokenCookie = (res: Response, token: string) => {
  const maxAge = ms(envVars.ACCESS_TOKEN_EXPIRES_IN as any) as unknown as number;
  console.log("maxAge set access token", maxAge);
  cookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: maxAge,
  });
};

const setRefreshTokenCookie = (res: Response, token: string) => {
  const maxAge = ms(envVars.REFRESH_TOKEN_EXPIRES_IN as any) as unknown as number;
  console.log("maxAge set refresh token", maxAge);
  cookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: maxAge,
  });
};

const setBetterAuthCookie = (res: Response, token: string) => {
  const maxAge = ms(envVars.BETTER_AUTH_SESSION_EXPIRES_IN as any) as unknown as number;
  console.log("maxAge set better auth token", maxAge);
  console.log("max age", maxAge);
  cookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: maxAge,
  });
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthCookie,
};
