import { Request, Response } from "express";
import { specialityService } from "./speciality.service";

const createSpeciality = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = specialityService.createSpeciality(payload);
    res.status(201).json({
      success: true,
      message: "Speciality created successfully",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getSpecialities = async (req: Request, res: Response) => {
  try {
    const result = await specialityService.getSpecialities();
    res.status(200).json({
      success: true,
      message: "Specialities data retrive successfully",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrive specialites",
      error: error.message,
    });
  }
};
const deleteSpecialities = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await specialityService.deleteSpeciality(id as string);
    res.status(200).json({
      success: true,
      message: "Speciality deleted successfully",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrive specialites",
      error: error.message,
    });
  }
};

const updateSpeciality = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await specialityService.updateSpeciality(
      payload,
      id as string,
    );
    res.status(200).json({
      success: true,
      message: "Speciality updated successfully",
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrive specialites",
      error: error.message,
    });
  }
};

export const specialityController = {
  createSpeciality,
  getSpecialities,
  deleteSpecialities,
  updateSpeciality,
};
