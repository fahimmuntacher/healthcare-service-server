import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await authService.registerUser(payload);
    sendResponse(res, {
        httpStatusCode : 201,
        success : true,
        message : "Patient registered sucessfully",
        data : result
    })
});

const loginUser = catchAsync(async(req : Request, res : Response) => {
     const payload = req.body;
    const result = await authService.loginUser(payload);
    sendResponse(res, {
        httpStatusCode : 201,
        success : true,
        message : "Patient login sucessfully",
        data : result
    })
})


export const AuthControllers = {
    registerPatient,
    loginUser
}
