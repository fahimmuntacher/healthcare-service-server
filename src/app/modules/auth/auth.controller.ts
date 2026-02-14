import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { tokenUtils } from "../../utils/token";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.registerUser(payload);

  const { accessToke, refreshToken, token, ...rest } = result;
  tokenUtils.setAccessTokenCookie(res, result.accessToke);
  tokenUtils.setRefreshTokenCookie(res, result.refreshToken);
  tokenUtils.setBetterAuthCookie(res, result.token as string);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Patient registered sucessfully",
    data: {
      token,
      accessToke,
      refreshToken,
      ...rest,
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.loginUser(payload);
  const { accessToke, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToke);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthCookie(res, token);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Patient login sucessfully",
    data: {
      token,
      accessToke,
      refreshToken,
      ...rest,
    },
  });
});

export const AuthControllers = {
  registerPatient,
  loginUser,
};
