export interface TErrorSources {
  path: string;
  message: string;
}

export interface TErrorRes {
  success: boolean;
  statusCode: number;
  message: string;
  stack?: string;
  errorSource: TErrorSources[];
}