/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Response as ExpressResponse } from "express";

interface IResponseData<T> {
  httpStatusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const sendResponse = <T>(
  res: ExpressResponse<any, Record<string, any>>,
  responseData: IResponseData<T>,
) => {
  const { httpStatusCode, success, message, data, meta } = responseData;

  res.status(httpStatusCode).json({
    success,
    message,
    data,
    meta
  });
};
