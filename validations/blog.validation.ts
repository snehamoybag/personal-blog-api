import { body, param } from "express-validator";

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
      return status === "PUBLISHED" || "DRAFT";
    })
    .withMessage(
      "Status must be either 'PUBLISHED' or 'DRAFT' in uppercase letters.",
    );
};
