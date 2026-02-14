import type { Response as ExpressResponse } from "express";

interface IResponseData<T> {
  httpStatusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export const sendResponse = <T>(
  res: ExpressResponse<any, Record<string, any>>,
  responseData: IResponseData<T>,
) => {
  const { httpStatusCode, success, message, data } = responseData;

  res.status(httpStatusCode).json({
    success,
    message,
    data,
  });
};