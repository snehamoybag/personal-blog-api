import { Router } from "express";
import verifyAuthToken from "../middlewares/auth/verify-auth-token.middleware";
import * as usersController from "../controllers/user.controller";
import * as imagesController from "../controllers/images.controller";
import { imageUploader } from "../middlewares/uploader.middleware";

const users = Router();

// jwt verification is required for all modification routes
users.post("/{*splat}", verifyAuthToken);
users.put("/{*splat}", verifyAuthToken);
users.delete("/{*splat}", verifyAuthToken);

users.get("/:id", usersController.getOne);

// users/1/blogs/?limit=10&offset=0&order=desc
users.get("/:id/blogs", usersController.getWrittenBlogs);

users.post("/:id/images", imageUploader, imagesController.create);

export default users;
