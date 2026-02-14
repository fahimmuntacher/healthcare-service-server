import type { CookieOptions, Request, Response as ExpressResponse } from "express"

const setCookie = (
    res: ExpressResponse<any, Record<string, any>>,
    key : string,
    value : string,
    options : CookieOptions,
) => {
    res.cookie(key, value, options);
}

const getCookie = (req : Request, key : string ) => {
    console.log("key from get cookie", key);
    console.log(req.cookies[key]);
    return req.cookies[key];
} 

const clearCookie = (
    res: ExpressResponse<any, Record<string, any>>,
    key : string,
    options : CookieOptions,
) => {
        res.clearCookie(key, options);
}

export const cookieUtils = {
    setCookie,
    getCookie,
    clearCookie
}