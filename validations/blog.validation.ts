import { param, query } from "express-validator";

export const limit = () => {
  const MIN_VALUE = 1;
  const MAX_VALUE = 20;

  return query("limit")
    .optional()
    .isInt({ min: MIN_VALUE, max: MAX_VALUE })
    .withMessage(
      `Limit must be an integer between ${MIN_VALUE} and ${MAX_VALUE}.`,
    );
};

export const offset = () => {
  return query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a non-negative integer.");
};

export const id = () => {
  return param("id")
    .isInt({ min: 1 })
    .withMessage("Blog id must be an integer greater than 0.");
};
