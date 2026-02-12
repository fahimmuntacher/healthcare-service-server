import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { userService } from "./user.service";
import status from "http-status";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await userService.createDoctor(payload);
    sendResponse(res, {
        httpStatusCode : status.CREATED,
        success : true,
        message : "Doctor registered sucessfully",
        data : result
    })
});

export const UserController = {
    createDoctor
}