import { Router } from "express";
import * as commentsController from "../controllers/comments.controller";

const comments = Router();

// /comments/3
comments.get("/:id", commentsController.getOne);

export default comments;
