import { query } from "express-validator";

export const limit = (maxLimit?: number) => {
  const MIN_VALUE = 0;
  const MAX_VALUE = maxLimit ? maxLimit : 20;

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

export const order = () => {
  return query("order")
    .optional()
    .isString()
    .withMessage("Order must be a string.")
    .custom((value: string) => {
      return value === "asc" || "desc";
    })
    .withMessage("Order must be either 'asc' ord 'desc'.");
};
