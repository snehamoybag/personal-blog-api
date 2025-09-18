import { param } from "express-validator";
import { findOne as findOneBlog } from "../models/blog.model";

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
