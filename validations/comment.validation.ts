import { body, param } from "express-validator";
import { findOne as findOneBlog } from "../models/blog.model";

// URL PARAMETERS
export const blog = () => {
  return param("blogId")
    .isInt({ min: 1 })
    .withMessage("Blog id must be an integer greater than 0.")
    .custom(async (blogId) => {
      const blog = await findOneBlog(Number(blogId));

      if (!blog) {
        throw new Error(`Blog with the id ${blogId} not found.`);
      }

      return true;
    });
};

export const id = () => {
  return param("id")
    .isInt({ min: 1 })
    .withMessage("Comment id must be an integer greater than 0.");
};

// BODY FIELDS
export const message = (isOptional: boolean = false) => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 255;

  return body("message")
    .optional(isOptional)
    .isString()
    .withMessage("Message must be of data type string.")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(
      `Message must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`,
    );
};
