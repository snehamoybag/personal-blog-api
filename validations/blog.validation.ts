import { body, param } from "express-validator";
import { findOneByUrl as findImageByUrl } from "../models/image.model";
import { SafeUser } from "../types/safe-user.type";

// URL PARAMETER
export const id = () => {
  return param("id")
    .isInt({ min: 1 })
    .withMessage("Blog id must be an integer greater than 0.");
};

// BODY FIELDS
export const title = (isOptional: boolean = false) => {
  const MIN_LENGTH = 10;
  const MAX_LENGTH = 120;

  return body("title")
    .optional(isOptional)
    .isString()
    .withMessage("Title must of data type string.")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(
      `Title must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`,
    );
};

export const content = (isOptional: boolean = false) => {
  const MIN_LENGTH = 120;

  return body("content")
    .optional(isOptional)
    .isString()
    .withMessage("Content must be of data type string.")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .isLength({ min: MIN_LENGTH })
    .withMessage(`Content must be atleast ${MIN_LENGTH} characters.`);
};

export const status = (isOptional: boolean = false) => {
  return body("status")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Status is required.")
    .custom((status) => {
      return status === "PUBLISHED" || "ARCHIVED";
    })
    .withMessage(
      "Status must be either 'PUBLISHED' or 'ARCHIVED' in uppercase letters.",
    );
};

export const coverImgUrl = (isOptional: boolean = false) => {
  return body("coverImgUrl")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Cover image url is required.")
    .isString()
    .withMessage("Cover image url must be of data type string.")
    .custom(async (url, { req }) => {
      const user = req.user as SafeUser; // make sure user is logged in before validations

      const image = await findImageByUrl(url);

      if (!image) {
        throw new Error(`No image with url ${url} is found.`);
      }

      if (image.userId !== user.id) {
        throw new Error(
          `Image is owned by someone else. Please upload your own image.`,
        );
      }
    });
};

export const tags = (isOptional: boolean = false) => {
  const MIN_LENGTH = 1;
  const MAX_LENGTH = 10;
  return body("tags")
    .optional(isOptional)
    .notEmpty()
    .withMessage("A tag is required.")
    .isArray({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(
      `Tags must be of data type array with ${MIN_LENGTH} to ${MAX_LENGTH} string items.`,
    )
    .custom((tags: unknown[]) => tags.every((tag) => typeof tag === "string"))
    .withMessage("Tags must be an array of strings.");
};
