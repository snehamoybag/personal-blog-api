import { body, param } from "express-validator";

// URL PARAMETER
export const id = () => {
  return param("id")
    .isInt({ min: 1 })
    .withMessage("Blog id must be an integer greater than 0.");
};

// REQ BODY
export const title = () => {
  const MIN_LENGTH = 15;
  const MAX_LENGTH = 120;

  return body("title")
    .isString()
    .withMessage("Title must be of data type string.")
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(`Title must be between ${MIN_LENGTH} and ${MAX_LENGTH}.`);
};

export const content = () => {
  const MIN_LENGTH = 120;

  return body("content")
    .isString()
    .withMessage("Content must be of data type string.")
    .isLength({ min: MIN_LENGTH })
    .withMessage(`Content must contain atleast ${MIN_LENGTH} characters.`);
};

export const status = () => {
  return body("status")
    .isString()
    .withMessage("Status must be of type string.")
    .custom((value) => {
      if (value === "PUBLISHED" || "DRAFT") {
        return true;
      }

      return false;
    })
    .withMessage(
      "Status must be either PUBLISHED or DRAFT in uppercased letters.",
    );
};
