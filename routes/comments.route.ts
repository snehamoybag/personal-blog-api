import { Router } from "express";
import * as commentsController from "../controllers/comments.controller";
import verifyAuthToken from "../middlewares/auth/verify-auth-token.middleware";

const comments = Router();

// make every modification route protected
comments.post("/{*splat}", verifyAuthToken);
comments.put("/{*splat}", verifyAuthToken);
comments.delete("/{*splat}", verifyAuthToken);

// /comments/3
comments.get("/:id", commentsController.getOne);
comments.put("/:id", commentsController.update);
comments.delete("/:id", commentsController.deleteOne);

export default comments;
