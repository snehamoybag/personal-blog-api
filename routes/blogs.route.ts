import { Router } from "express";
import * as blogsController from "../controllers/blogs.controller";
import {
  getMany as getManyComments,
  create as createComment,
} from "../controllers/comments.controller";
import verifyAuthToken from "../middlewares/auth/verify-auth-token.middleware";
import adminOnly from "../middlewares/auth/admin-only.middleware";

const blogs = Router();

// jwt verification is required for all modification routes
blogs.post("/{*splat}", verifyAuthToken);
blogs.put("/{*splat}", verifyAuthToken);
blogs.delete("/{*splat}", verifyAuthToken);

// blogs/?limit=10&offset=0
blogs.get("/", blogsController.getMany);
blogs.post("/", adminOnly, blogsController.create);

// blogs/3
blogs.get("/:id", blogsController.getOne);
blogs.put("/:id", adminOnly, blogsController.update);
blogs.delete("/:id", adminOnly, blogsController.deleteOne);

// blogs/2/commets/?limit=10&offset=10
blogs.get("/:blogId/comments", getManyComments);
blogs.post("/:blogId/comments", createComment);

export default blogs;
