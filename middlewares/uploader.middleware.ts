import { RequestHandler } from "express";
import { imageUpload } from "../configs/multer.config";
import { MulterError } from "multer";

const fieldName = "image";
const upload = imageUpload.single(fieldName);

export const imageUploader: RequestHandler = (req, res, next) => {
  upload(req, res, (err) => {
    if (!err) {
      return next();
    }

    if (err instanceof MulterError) {
      return next(new Error(`${err.code}: ${err.message}`));
    }

    if (err instanceof Error) {
      return next(err);
    }

    if (typeof err === "object" && Object.hasOwn(err, "message")) {
      return next(new Error(err.message));
    }

    return next(new Error("Failed to upload to cloud storage."));
  });
};
