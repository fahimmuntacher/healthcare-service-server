import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { envVars } from "./env";
import AppError from "../errorHelpers/AppError";
import status from "http-status";
cloudinary.config({
  cloud_name: envVars.CLOUDINARY_CLOUDE_NAME,
  api_key: envVars.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET,
});

export const uploadFileToCloudinary = (
  buffer: Buffer,
  fileName: string,
): Promise<UploadApiResponse> => {
  if (!buffer || !fileName) {
    throw new AppError(
      "File buffer and file name are required",
      status.BAD_REQUEST,
    );
  }

  const extention = fileName.split(".").pop()?.toLocaleLowerCase();

  const fileNameWithoutExtention = fileName
    .split(".")
    .slice(0, -1)
    .join(".")
    .toLocaleLowerCase()
    .replace(/\s+/g, "-")
    // eslint-disable-next-line no-useless-escape
    .replace(/[^a-z0-9\-]/g, "");

  const uniqueName =
    Math.random().toString(36).substring(2) +
    "-" +
    Date.now() +
    "-" +
    fileNameWithoutExtention;

  const folder = extention === "pdf" ? "pdfs" : "images";

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          public_id: `ph-healthcare/${folder}/${uniqueName}`,
          folder: `ph-healthcare/${folder}`,
        },
        (error, result) => {
          if (error) {
            return reject(
              new AppError(
                "Failed to upload file cloudinary",
                status.INTERNAL_SERVER_ERROR,
              ),
            );
          }
          resolve(result as UploadApiResponse);
        },
      )
      .end(buffer);
  });
};

export const deleteFileFromCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)+$/;
    const match = url.match(regex);
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
      });
      console.log(`File ${publicId} deleted from the cloudinary`);
    }
  } catch (error) {
    console.log("Error delteing file from the cloudinary", error);
    throw new AppError("File delete failed", status.INTERNAL_SERVER_ERROR);
  }
};

export const cloudinaryUpload = cloudinary;
