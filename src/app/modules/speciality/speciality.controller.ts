import { Request, Response } from "express";
import { specialityService } from "./speciality.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

// create speciality
const createSpeciality = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = specialityService.createSpeciality(payload);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Speciality created successfully",
    data: result,
  });
});

// get all speciality
const getSpecialities = catchAsync(async (req: Request, res: Response) => {
  const result = await specialityService.getSpecialities();
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Speciality retrived successfully",
    data: result,
  });
});

// delete speciality
const deleteSpecialities = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await specialityService.deleteSpeciality(id as string);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Speciality deleted successfully",
    data: result,
  });
});

// update speciality
const updateSpeciality = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await specialityService.updateSpeciality(
    payload,
    id as string,
  );
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Speciality updated successfully",
    data: result,
  });
});
export const specialityController = {
  createSpeciality,
  getSpecialities,
  deleteSpecialities,
  updateSpeciality,
};
