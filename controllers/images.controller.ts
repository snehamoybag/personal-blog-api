import { RequestHandler } from "express";
import { SuccessResponse } from "../libs/http-response-shapes";
import * as imageModel from "../models/image.model";
import assertUser from "../libs/asserts/user.assert";
import { CreateImage } from "../types/create-image.type";
import { ErrorForbidden } from "../libs/http-exceptions";

// make sure multer middlware is called before this controller
export const create: RequestHandler = async (req, res) => {
  const user = assertUser(req);
  const userParamId = Number(req.params.id);

  if (user.id !== userParamId) {
    throw new ErrorForbidden(
      "You don not have permissions to upload on this route.",
    );
  }

  const file = req.file as Express.Multer.File;
  const data: CreateImage = {
    publicId: file.filename,
    url: file.path,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    userId: user.id,
  };

  const image = await imageModel.create(data);

  res.json(new SuccessResponse("List of uploaded images.", { image }));
};
