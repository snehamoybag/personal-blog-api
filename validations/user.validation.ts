import { body } from "express-validator";

export const name = (
  name: "First name" | "Last name",
  fieldName: "firstName" | "lastName",
) => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 35;

  return body(fieldName)
    .isString()
    .withMessage(`${name} must be of type string.`)
    .trim()
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(`${name} must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
};

export const email = () => {
  return body("email")
    .notEmpty()
    .withMessage("Email is requrired")
    .isEmail()
    .withMessage("Unsupported email format.");
};

export const password = () => {
  const MIN_LENGTH = 6;
  const MAX_LENGTH = 32;

  return body("password")
    .isString()
    .withMessage("Password must be of type string.")
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(`Password must be between ${MIN_LENGTH} and ${MAX_LENGTH}.`);
};
