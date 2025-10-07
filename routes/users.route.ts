import { Router } from "express";
import verifyAuthToken from "../middlewares/auth/verify-auth-token.middleware";
import * as imagesController from "../controllers/images.controller";
import { imageUploader } from "../middlewares/uploader.middleware";

const users = Router();

// jwt verification is required for all modification routes
users.post("/{*splat}", verifyAuthToken);
users.put("/{*splat}", verifyAuthToken);
users.delete("/{*splat}", verifyAuthToken);

// users/3/images
users.get("/:id/images", () => {});

users.post("/:id/images", imageUploader, imagesController.create);

users.delete("/:id/images", () => {});

export default users;
