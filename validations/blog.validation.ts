import { param } from "express-validator";

// url parameter
export const id = () => {
  return param("id")
    .isInt({ min: 1 })
    .withMessage("Blog id must be an integer greater than 0.");
};
